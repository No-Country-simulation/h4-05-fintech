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

import { Environment } from '../../common/enums/environments';
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

  private refreshSecret =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.jwt.refreshSecret
      : 'refresh-secret';

  private cookieName =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.cookieName
      : 'refresh-cookie';

  private accessToken = async (payload: JwtPayload): Promise<string> =>
    await this.jwtService.signAsync(payload, {
      secret: this.accessSecret,
      expiresIn: '15m',
    });

  private refreshToken = async (payload: JwtPayload): Promise<string> =>
    await this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: '2h',
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
    const userFound = await this.userService.getUser(data.email);

    if (userFound) throw new ConflictException('user already registered');

    const isMatch = data.password === data.confirmPassword;

    if (!isMatch) throw new BadRequestException(`the passwords don't match`);

    const hashed = await bcrypt.hash(data.password, 10);

    // Implementar un proveedor de correos electrónicos

    await this.userService.createUser({ email: data.email, password: hashed });

    return { message: 'user successfully registered' };
  }

  async login(req: UserRequest, res: Response, data: LoginDto): Promise<{ accessToken: string }> {
    const userFound = await this.userService.getUser(data.email);

    if (!userFound) throw new NotFoundException('user not found');

    const isMatch = await bcrypt.compare(data.password, userFound.password);

    if (!isMatch) throw new UnauthorizedException('invalid credentials');

    const accessToken = await this.accessToken({ id: userFound.id });
    const refreshToken = await this.refreshToken({ id: userFound.id });

    const userAgent = req.headers['user-agent'] ?? 'testing';

    await this.prisma.auth.create({ data: { userId: userFound.id, refreshToken, userAgent } });

    await this.refreshCookie(res, refreshToken);

    return { accessToken };
  }
}
