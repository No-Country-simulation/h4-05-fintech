import crypto from 'node:crypto';

import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

import config from '../../../config';
import { AppleAuthRequest, AppleTokenRequest } from './apple.interface';

@Injectable()
export class AppleAuthService {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  private getUriWithParams(uri: URL, params: { [key: string]: any }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value instanceof Array) {
        if (value.length > 1) uri.searchParams.set(key, value.join(' '));
        else if (value.length === 1) uri.searchParams.set(key, value[0]);
      } else {
        uri.searchParams.set(key, value.toString());
      }
    });
    return uri.toString();
  }

  async login() {
    const uri = new URL('https://appleid.apple.com/auth/authorize');
    const state = crypto.randomBytes(16).toString();

    const params: AppleAuthRequest = {
      response_type: ['code', 'id_token'],
      client_id: this.configService.apple.clientId,
      redirect_uri: this.configService.apple.callbackUri,
      state,
      scope: ['email', 'name'],
      response_mode: ['form_post'],
    };

    return { url: this.getUriWithParams(uri, params) };
  }

  async getToken(req: Request) {
    const applePublicKeys = new URL('https://appleid.apple.com/auth/keys');
    const origin = new URL(req.url, this.configService.backendUrl);
    const code = origin.searchParams.get('code');
    const id_token = origin.searchParams.get('id_token');

    try {
      const uri = new URL('https://appleid.apple.com/auth/token');
      const params: AppleTokenRequest = {
        grant_type: ['authorization_code'],
        code,
        client_id: this.configService.apple.clientId,
        redirect_uri: this.configService.apple.callbackUri,
        login_hint: '',
      };

      const { data: publicKey } = await firstValueFrom(
        this.httpService.post(applePublicKeys.toString()),
      );

      await this.jwtService.verifyAsync(id_token, {
        secret: publicKey,
        algorithms: ['RS256'],
      });

      const res = await firstValueFrom(
        this.httpService.post(this.getUriWithParams(uri, params), {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
      return res.data.access_token;
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }
}
