import crypto from 'node:crypto';

import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { LoginDto, RegistryDto } from './dto';

import { Environment, ErrorMessage } from '../../common/enums';
import { JwtPayload, UserRequest } from '../../common/interfaces/user-request.interface';
import config from '../../config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
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

  private refreshCookie = async (res: Response, refreshToken: string) => {
    const options: CookieOptions = {
      httpOnly: true,
      secure: this.configService.nodeEnv === Environment.PRODUCTION ? true : false,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    };
    res.cookie(this.cookieName, refreshToken, options);
  };

  async registry(data: RegistryDto) {
    const { email, password, confirmPassword } = data;
    const userFound = await this.userService.getUser({ email });

    if (userFound) throw new ConflictException(ErrorMessage.REGISTERED_USER);

    const isMatch = password === confirmPassword;

    if (!isMatch) throw new BadRequestException(ErrorMessage.PASSWORD_UNMATCH);

    const hashed = await bcrypt.hash(password, 10);
    const code = crypto.randomBytes(32).toString('hex');

    // Implementar un proveedor de correos electrónicos

    await this.userService.createUser({ email, password: hashed, code });

    return { message: 'user successfully registered' };
  }

  async login(req: UserRequest, res: Response, data: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = data;
    const userFound = await this.userService.getUser({ email });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);

    const accessToken = await this.accessToken({ id: userFound.id });
    const refreshToken = await this.refreshToken({ id: userFound.id });

    const userAgent = req.headers['user-agent'] ?? 'testing';

    await this.prisma.auth.create({ data: { userId: userFound.id, refreshToken, userAgent } });

    await this.refreshCookie(res, refreshToken);

    return { accessToken };
  }
}
