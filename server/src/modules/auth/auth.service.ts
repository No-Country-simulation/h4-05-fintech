import crypto from 'node:crypto';

import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { CookieOptions, Response } from 'express';
import bcrypt from 'bcrypt';

import { Environment, ErrorMessage } from '../../common/enums';
import { JwtPayload, UserRequest } from '../../common/interfaces/user-request.interface';
import { EmailData } from '../../common/modules/mailer/mailer.interface';
import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { MailerService } from '../../common/modules/mailer/mailer.service';

import { UserService } from '../user/user.service';
import { LoginDto, RegistryDto } from './dto';

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

  async registry(dto: RegistryDto) {
    const { email, password, confirmPassword } = dto;
    const userFound = await this.userService.getUser({ email });

    if (userFound) throw new ConflictException(ErrorMessage.REGISTERED_USER);

    const isMatch = password === confirmPassword;

    if (!isMatch) throw new BadRequestException(ErrorMessage.PASSWORD_UNMATCH);

    const hashed = await bcrypt.hash(password, 10);
    const code = crypto.randomBytes(32).toString('hex');

    const emailData: EmailData = {
      email,
      subject: 'Bienvenido a iUPI',
      template: 'verify.hbs',
      variables: {
        link: `${this.configService.frontendUrl}/auth/verify?code=${code}`,
      },
    };

    if (this.configService.nodeEnv === Environment.PRODUCTION)
      await this.mailerService.sendMail(emailData);
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev(emailData);

    await this.userService.createUser({ email, password: hashed, code });

    return { message: 'user successfully registered' };
  }

  async verify(code: string) {
    const userFound = await this.userService.getUser({ code });
    if (!userFound) throw new NotFoundException('user not found');

    userFound.verified = true;
    userFound.code = null;
    userFound.expiration = null;

    await this.userService.updateUser(userFound);

    return { message: 'user successfully verified' };
  }

  async login(req: UserRequest, res: Response, dto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = dto;
    const userFound = await this.userService.getUser({ email });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);

    if (!userFound.verified) throw new ForbiddenException(ErrorMessage.USER_NOT_VERIFIED);

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

  async logout(req: UserRequest, res: Response) {
    const refreshToken = req.headers.cookie?.split('=')[1];

    await this.removeCookie(res);
    const where: Prisma.AuthWhereInput = refreshToken && { refreshToken };
    await this.prisma.auth.deleteMany({ where });

    return { message: 'successfully logged out' };
  }
}
