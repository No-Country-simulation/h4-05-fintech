import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

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

  // Execute crypto.randomBytes(32).toString('hex') to generate a key
  private encryptKey =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? Buffer.from(this.configService.encriptKey, 'hex')
      : Buffer.from('d109cd4b5dea3329a60cd9b495b6d6a42cb2623cf7a406625481799c0afbe19e', 'hex');

  private iv = crypto.randomBytes(16);

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

  async extractTokenFromClientHeader(client: Socket): Promise<string | undefined> {
    const { authorization } = client.handshake.headers;
    return authorization as string;
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

  async encrypt(text: string): Promise<{ iv: string; encryptedData: string }> {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptKey, this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  }

  async decrypt(text: { iv: string; encryptedData: string }): Promise<Buffer<ArrayBufferLike>> {
    const iv = Buffer.from(text.iv, 'hex');
    const encryptedData = Buffer.from(text.encryptedData, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptKey, iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
  }
}
