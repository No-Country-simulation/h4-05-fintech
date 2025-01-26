import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import config from '../../../config';
import { Environment } from '../../enums';
import { CookieOptions, Response } from 'express';
import { JwtPayload, UserRequest } from '../../interfaces';

@Injectable()
export class CredentialsService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly jwtService: JwtService,
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

  async extractJwtFromCookie(req: UserRequest): Promise<string | undefined> {
    const [cookieName, cookieValue] = req.headers.cookie?.split('=') ?? [];
    return cookieName === this.cookieName ? cookieValue : undefined;
  }

  async extractJwtFromBearerHeader(req: UserRequest): Promise<string | undefined> {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async accessToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiration,
    });
  }

  async refreshToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiration,
    });
  }

  async setCookie(res: Response, refreshToken: string) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    };
    res.cookie(this.cookieName, refreshToken, options);
  }

  async removeCookie(res: Response) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };
    res.clearCookie(this.cookieName, options);
  }

  async verifyAccessToken(accessToken: string): Promise<JwtPayload | undefined> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
      secret: this.accessSecret,
    });
    return payload;
  }

  async verifyRefreshToken(refreshToken: string): Promise<JwtPayload | undefined> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
      secret: this.refreshSecret,
    });
    return payload;
  }
}
