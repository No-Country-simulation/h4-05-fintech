import crypto from 'node:crypto';

import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { User } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';

import { UserService } from '../../user/user.service';
import { ProfileService } from '../../profile/profile.service';

import { PrismaService } from '../../../common/modules/prisma/prisma.service';
import { CredentialsService } from '../../../common/modules/cookies/credentials.service';
import { UserRequest } from '../../../common/interfaces';
import { ErrorMessage } from '../../../common/enums';

import {
  GoogleAuthRequest,
  GoogleCredentialsResponse,
  GoogleTokenRequestByCode,
  GoogleTokenRequestByRefreshToken,
  GoogleTokenVerificationInfo,
  GoogleUserInfo,
} from './google.interfaces';
import config from '../../../config';

@Injectable()
export class GoogleAuthService {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
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
    const uri = new URL('https://accounts.google.com/o/oauth2/auth');
    const state = crypto.randomBytes(16).toString();

    const params: GoogleAuthRequest = {
      client_id: this.configService.google.clientId,
      redirect_uri: this.configService.google.callbackUri,
      response_type: ['code'],
      scope: ['email', 'profile'],
      state,
      access_type: ['offline'],
      include_granted_scopes: true,
    };

    return { url: this.getUriWithParams(uri, params) };
  }

  async getToken(req: UserRequest) {
    const uri = new URL('https://oauth2.googleapis.com/token');
    const origin = new URL(req.url, this.configService.backendUrl);
    const code = origin.searchParams.get('code');

    const params: GoogleTokenRequestByCode = {
      grant_type: ['authorization_code'],
      code,
      client_id: this.configService.google.clientId,
      client_secret: this.configService.google.clientSecret,
      redirect_uri: this.configService.google.callbackUri,
      scope: ['email'],
    };

    const { data } = await firstValueFrom(
      this.httpService.post<GoogleCredentialsResponse>(this.getUriWithParams(uri, params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );

    const { access_token, refresh_token } = data;

    return { access_token, refresh_token };
  }

  async verifyAccessToken(access_token: string) {
    const uri = new URL('https://oauth2.googleapis.com/tokeninfo');

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<GoogleTokenVerificationInfo>(
          this.getUriWithParams(uri, { access_token }),
        ),
      );

      return data;
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }

  async getUserInfo(access_token: string) {
    const uri = new URL('https://www.googleapis.com/oauth2/v2/userinfo');
    const { data } = await firstValueFrom(
      this.httpService.get<GoogleUserInfo>(uri.toString(), {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    );

    const {
      email,
      picture: image,
      verified_email: verified,
      given_name: name,
      family_name: lastname,
    } = data;

    let user: User;

    user = await this.userService.getUser({ email });

    if (!user) {
      user = await this.userService.createUser({ email, verified });
      await this.profileService.createUserProfile(user.id, { image, name, lastname });
    }

    return user;
  }

  async logout(token: string) {
    const uri = new URL('https://oauth2.googleapis.com/revoke');

    try {
      await firstValueFrom(
        this.httpService.post(this.getUriWithParams(uri, { token }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );

      return { message: 'Successfully logged out' };
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }

  async callback(req: UserRequest, res: Response) {
    const userFound = await this.userService.getUser({ id: req.user.id });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    const { id } = userFound;

    const userAgent = req.headers['user-agent'] ?? 'testing';

    const refreshToken = await this.credentialsService.refreshToken({ id });

    await this.prisma.auth.create({
      data: {
        userId: id,
        refreshToken,
        userAgent,
      },
    });

    await this.credentialsService.setCookie(res, refreshToken);

    res.redirect(this.configService.frontendUrl);
  }

  async verifyRefreshToken() {
    const uri = new URL('https://oauth2.googleapis.com/token');

    const params: GoogleTokenRequestByRefreshToken = {
      client_id: this.configService.google.clientId,
      client_secret: this.configService.google.clientSecret,
      refresh_token: '',
      grant_type: ['refresh_token'],
    };

    try {
      const res = await firstValueFrom(this.httpService.post(this.getUriWithParams(uri, params)));

      return res.data;
    } catch (error) {
      throw new BadRequestException(error.response?.data || error.message);
    }
  }
}
