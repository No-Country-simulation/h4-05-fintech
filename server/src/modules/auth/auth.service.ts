import crypto from 'node:crypto';

import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  NotAcceptableException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { CookieOptions, Response } from 'express';
import bcrypt from 'bcrypt';

import { Environment, ErrorMessage } from '../../common/enums';
import { JwtPayload, UserRequest } from '../../common/interfaces/user-request.interface';
import { EmailData } from '../../common/modules/mailer/mailer.interface';
import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { MailerService } from '../../common/modules/mailer/mailer.service';

import { UserService } from '../user/user.service';
import {
  LoginDto,
  RegistryDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ResetPasswordQueryDto,
  ChangePasswordDto,
} from './dto';

import config from '../../config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  private accessSecret =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.jwt.accessSecret
      : 'access-secret';

  private accessExpiration =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.jwt.accessExpiration
      : '15m';

  private refreshSecret =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.jwt.refreshSecret
      : 'refresh-secret';

  private refreshExpiration =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.jwt.refreshExpiration
      : '2h';

  private cookieName =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.cookieName
      : 'refresh-cookie';

  private accessToken = async (payload: JwtPayload): Promise<string> =>
    await this.jwtService.signAsync(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiration,
    });

  private refreshToken = async (payload: JwtPayload): Promise<string> =>
    await this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiration,
    });

  private setCookie = async (res: Response, refreshToken: string) => {
    const options: CookieOptions = {
      httpOnly: true,
      secure: this.configService.nodeEnv === Environment.PRODUCTION ? true : false,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    };
    res.cookie(this.cookieName, refreshToken, options);
  };

  private async removeCookie(res: Response) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: this.configService.nodeEnv === Environment.PRODUCTION ? true : false,
      sameSite: 'none',
    };
    res.clearCookie(this.cookieName, options);
  }

  private baseUrl = new URL('/auth/', this.configService.frontendUrl);

  async registry(body: RegistryDto) {
    const { email, password, confirmPassword } = body;
    const userFound = await this.userService.getUser({ email });

    if (userFound) throw new ConflictException(ErrorMessage.REGISTERED_USER);

    const isMatch = password === confirmPassword;

    if (!isMatch) throw new BadRequestException(ErrorMessage.PASSWORD_UNMATCH);

    const hashed = await bcrypt.hash(password, 10);
    const code = crypto.randomBytes(32).toString('hex');

    const link = new URL('verify', this.baseUrl);
    link.searchParams.set('code', code);

    const emailData: EmailData = {
      email,
      subject: 'Bienvenido a iUPI',
      template: 'verify.hbs',
      variables: { link },
    };

    if (this.configService.nodeEnv === Environment.PRODUCTION)
      await this.mailerService.sendMail(emailData);
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev(emailData);

    await this.userService.createUser({ email, password: hashed, code });

    return { message: 'user successfully registered' };
  }

  async verify(code: string) {
    const valid32HexCode = /^[a-f0-9]{64}$/i;

    if (!valid32HexCode.test(code)) throw new NotAcceptableException('invalid 32-digit code');

    const userFound = await this.userService.getUser({ code });

    if (!userFound) throw new NotFoundException('user not found');

    const userUpdated = Object.assign(userFound, { verified: true, code: null });

    await this.userService.updateUser(userUpdated);

    return { message: 'user successfully verified' };
  }

  async login(req: UserRequest, res: Response, body: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = body;
    const userFound = await this.userService.getUser({ email });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      let userUpdated: User;
      if (userFound.attempts === 4) {
        userUpdated = Object.assign(userFound, { attempts: userFound.attempts + 1, blocked: true });
        await this.userService.updateUser(userUpdated);
        throw new ForbiddenException(ErrorMessage.USER_BLOCKED);
      } else {
        userUpdated = Object.assign(userFound, { attempts: userFound.attempts + 1 });
        await this.userService.updateUser(userUpdated);
        throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);
      }
    }

    if (!userFound.verified) throw new ForbiddenException(ErrorMessage.USER_NOT_VERIFIED);

    if (isMatch && userFound.blocked) throw new ForbiddenException(ErrorMessage.USER_BLOCKED);

    const accessToken = await this.accessToken({ id: userFound.id });
    const refreshToken = await this.refreshToken({ id: userFound.id });

    const userAgent = req.headers['user-agent'] ?? 'testing';

    await this.prisma.auth.create({ data: { userId: userFound.id, refreshToken, userAgent } });

    await this.setCookie(res, refreshToken);

    return { accessToken };
  }

  async refresh(req: UserRequest, res: Response) {
    const refreshToken = req.headers.cookie?.split('=')[1];
    const userAgent = req.headers['user-agent'] ?? 'testing';

    const { id } = this.jwtService.decode<JwtPayload>(refreshToken);

    const accessToken = await this.accessToken({ id });
    const newRefreshToken = await this.refreshToken({ id });

    const authList = await this.prisma.auth.findMany({ where: { userId: id } });
    const authMatch = authList.find((auth) => auth.refreshToken === refreshToken);

    if (authMatch && authMatch.userAgent === userAgent)
      await this.prisma.auth.update({
        where: { id: authMatch.id },
        data: Object.assign(authMatch, { refreshToken: newRefreshToken }),
      });
    else
      await this.prisma.auth.create({
        data: {
          userId: id,
          refreshToken: newRefreshToken,
          userAgent,
        },
      });

    await this.removeCookie(res);
    await this.setCookie(res, newRefreshToken);

    return { accessToken };
  }

  async changePassword(id: string, body: ChangePasswordDto) {
    const userFound = await this.userService.getUser({ id });

    const { currentPassword, newPassword } = body;

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const isMatch = await bcrypt.compare(currentPassword, userFound.password);

    if (!isMatch) throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);

    if (currentPassword === newPassword) throw new ConflictException(ErrorMessage.EQUAL_PASSWORDS);

    const hashed = await bcrypt.hash(newPassword, 10);

    const updatedUser = Object.assign(userFound, { password: hashed });

    await this.userService.updateUser(updatedUser);

    return { message: 'password successfully changed' };
  }

  async forgotPassword(body: ForgotPasswordDto) {
    const { email } = body;
    const userFound = await this.userService.getUser({ email });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 15);

    const code = crypto.randomBytes(32).toString('hex');

    const query = { code, exp: new Date(expiration).getTime() };

    const link = new URL('reset-password', this.configService.frontendUrl);

    Object.entries(query).forEach(([key, value]) => {
      link.searchParams.set(key, value.toString());
    });

    const emailData: EmailData = {
      email,
      subject: 'Recuperación de contraseña',
      template: 'password-recovery.hbs',
      variables: { link },
    };

    if (this.configService.nodeEnv === Environment.PRODUCTION)
      await this.mailerService.sendMail(emailData);
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev(emailData);

    const userUpdated = Object.assign(userFound, { code });

    await this.userService.updateUser(userUpdated);

    return { message: 'password recovery process initialized' };
  }

  async resetPassword(query: ResetPasswordQueryDto, body: ResetPasswordDto) {
    const { code, exp } = query;
    const { newPassword, confirmPassword } = body;

    const userFound = await this.userService.getUser({ code });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (parseInt(exp) <= new Date().getTime())
      throw new UnauthorizedException(ErrorMessage.EXPIRED_TIME);

    if (newPassword != confirmPassword)
      throw new BadRequestException(ErrorMessage.PASSWORD_UNMATCH);

    const hashed = await bcrypt.hash(newPassword, 10);

    const updatedUser = Object.assign(userFound, { code: null, password: hashed });

    await this.userService.updateUser(updatedUser);

    return { message: 'password successfully reset' };
  }

  async logout(req: UserRequest, res: Response) {
    const refreshToken = req.headers.cookie?.split('=')[1];

    await this.removeCookie(res);
    const where: Prisma.AuthWhereInput = refreshToken && { refreshToken };
    await this.prisma.auth.deleteMany({ where });

    return { message: 'successfully logged out' };
  }
}
