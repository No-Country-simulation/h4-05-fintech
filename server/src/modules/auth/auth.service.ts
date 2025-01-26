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
import { Prisma, User } from '@prisma/client';
import { Response } from 'express';
import bcrypt from 'bcrypt';

import { Environment, ErrorMessage } from '../../common/enums';
import { UserRequest } from '../../common/interfaces';
import { EmailData } from '../../common/modules/mailer/mailer.interface';
import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { MailerService } from '../../common/modules/mailer/mailer.service';
import { CredentialsService } from '../../common/modules/cookies/credentials.service';

import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';

import {
  LoginDto,
  RegistryDto,
  ResetPasswordDto,
  ResetPasswordQueryDto,
  ChangePasswordDto,
  SendEmailDto,
} from './dto';

import config from '../../config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  // https://iupi-fintech.frontend/auth/verify?code=${code}
  private baseUrl = new URL('/auth/', this.configService.frontendUrl);

  async registry(body: RegistryDto) {
    const { email, password, confirmPassword } = body;
    const userFound = await this.userService.getUser({ email });

    if (userFound) throw new ConflictException(ErrorMessage.REGISTERED_USER);

    const isMatch = password === confirmPassword;

    if (!isMatch) throw new BadRequestException(ErrorMessage.PASSWORD_UNMATCH);

    const hashed = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomBytes(32).toString('hex');

    const link = new URL('verify', this.baseUrl);
    link.searchParams.set('code', verificationCode);

    const emailData: EmailData = {
      email,
      subject: 'Bienvenido a iUPI',
      template: 'verify.hbs',
      // Frontend example: https://iupi-fintech.frontend/auth/verify?code=${code}
      variables: { link },
    };

    if (this.configService.nodeEnv === Environment.PRODUCTION)
      await this.mailerService.sendMail(emailData);
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev(emailData);

    await this.userService.createUser({ email, password: hashed, verificationCode });

    return { message: 'user successfully registered' };
  }

  async resendVerification(body: SendEmailDto) {
    const { email } = body;
    const userFound = await this.userService.getUser({ email });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (userFound.verified) throw new BadRequestException(ErrorMessage.USER_NOT_VERIFIED);

    const verificationCode = crypto.randomBytes(32).toString('hex');

    const link = new URL('verify', this.baseUrl);
    link.searchParams.set('code', verificationCode);

    const emailData: EmailData = {
      email,
      subject: 'Bienvenido a iUPI',
      template: 'verify.hbs',
      // Frontend example: https://iupi-fintech.frontend/auth/verify?code=${code}
      variables: { link },
    };

    if (this.configService.nodeEnv === Environment.PRODUCTION)
      await this.mailerService.sendMail(emailData);
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev(emailData);

    const userUpdated = Object.assign(userFound, { verificationCode });

    await this.userService.updateUser(userUpdated);

    return { message: 'Verification email successfully resent' };
  }

  async verify(verificationCode: string) {
    const valid32HexCode = /^[a-f0-9]{64}$/i;

    if (!valid32HexCode.test(verificationCode))
      throw new NotAcceptableException('invalid 32-digit code');

    const userFound = await this.userService.getUser({ verificationCode });

    if (!userFound) throw new NotFoundException('user not found');

    const userUpdated = Object.assign(userFound, { verified: true, verificationCode: null });

    await this.userService.updateUser(userUpdated);
    await this.profileService.createUserProfile(userFound.id);

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

    const [accessToken, refreshToken] = await Promise.all([
      this.credentialsService.accessToken({ id: userFound.id }),
      this.credentialsService.refreshToken({ id: userFound.id }),
    ]);

    const userAgent = req.headers['user-agent'] ?? 'testing';

    await this.prisma.auth.create({ data: { userId: userFound.id, refreshToken, userAgent } });

    const userUpdated = Object.assign(userFound, { attempts: 0 });
    await this.userService.updateUser(userUpdated);

    await this.credentialsService.setCookie(res, refreshToken);

    return { accessToken };
  }

  async refresh(req: UserRequest, res: Response) {
    const refreshToken = req.headers.cookie?.split('=')[1];
    const userAgent = req.headers['user-agent'] ?? 'testing';

    const { id } = await this.credentialsService.verifyRefreshToken(refreshToken);

    const [accessToken, newRefreshToken] = await Promise.all([
      this.credentialsService.accessToken({ id }),
      this.credentialsService.refreshToken({ id }),
    ]);

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

    await this.credentialsService.removeCookie(res);
    await this.credentialsService.setCookie(res, newRefreshToken);

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

  async forgotPassword(body: SendEmailDto) {
    const { email } = body;
    const userFound = await this.userService.getUser({ email });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 15);

    const resetPasswordCode = crypto.randomBytes(32).toString('hex');

    const query = { resetPasswordCode, exp: new Date(expiration).getTime() };

    const link = new URL('reset-password', this.configService.frontendUrl);

    Object.entries(query).forEach(([key, value]) => {
      link.searchParams.set(key, value.toString());
    });

    const emailData: EmailData = {
      email,
      subject: 'Recuperación de contraseña',
      template: 'password-recovery.hbs',
      // Frontend example: https://iupi-fintech.frontend/auth/reset-password?code=${code}&exp=${exp}
      variables: { link },
    };

    if (this.configService.nodeEnv === Environment.PRODUCTION)
      await this.mailerService.sendMail(emailData);
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev(emailData);

    const userUpdated = Object.assign(userFound, { resetPasswordCode });

    await this.userService.updateUser(userUpdated);

    return { message: 'password recovery process initialized' };
  }

  async resetPassword(query: ResetPasswordQueryDto, body: ResetPasswordDto) {
    const { code: resetPasswordCode, exp } = query;
    const { newPassword, confirmPassword } = body;

    const userFound = await this.userService.getUser({ resetPasswordCode });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (parseInt(exp) <= new Date().getTime())
      throw new UnauthorizedException(ErrorMessage.EXPIRED_TIME);

    if (newPassword != confirmPassword)
      throw new BadRequestException(ErrorMessage.PASSWORD_UNMATCH);

    const hashed = await bcrypt.hash(newPassword, 10);

    const updatedUser = Object.assign(userFound, { resetPasswordCode: null, password: hashed });

    await this.userService.updateUser(updatedUser);

    return { message: 'password successfully reset' };
  }

  async logout(req: UserRequest, res: Response) {
    const refreshToken = req.headers.cookie?.split('=')[1];

    await this.credentialsService.removeCookie(res);
    const where: Prisma.AuthWhereInput = refreshToken && { refreshToken };
    await this.prisma.auth.deleteMany({ where });

    return { message: 'successfully logged out' };
  }
}
