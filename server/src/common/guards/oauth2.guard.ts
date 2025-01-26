import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

import { GoogleAuthService } from '../../modules/ouath2/google/google.service';
import { AppleAuthService } from '../../modules/ouath2/apple/apple.service';

import { UserRequest } from '../interfaces';
import { ErrorMessage } from '../enums';
import { Response } from 'express';
import { APPLE_CALLBACK, GOOGLE_CALLBACK, IS_LOGIN } from '../decorators';
import { PrismaService } from '../modules/prisma/prisma.service';
import { CredentialsService } from '../modules/credentials/credentials.service';

@Injectable()
export class OAuth2Guard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly credentialsServuice: CredentialsService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly appleAuthService: AppleAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isLogin = this.reflector.get<boolean>(IS_LOGIN, context.getHandler());
    const googleCallback = this.reflector.get<boolean>(GOOGLE_CALLBACK, context.getHandler());
    const appleCallback = this.reflector.get<boolean>(APPLE_CALLBACK, context.getHandler());

    const request = context.switchToHttp().getRequest<UserRequest>();
    const response = context.switchToHttp().getResponse<Response>();
    const refreshToken = await this.credentialsServuice.extractJwtFromCookie(request);

    try {
      if (!isLogin) {
        await this.credentialsServuice.verifyRefreshToken(refreshToken);
        return true;
      } else {
        if (refreshToken) {
          const payload = await this.credentialsServuice.verifyRefreshToken(refreshToken);
          if (payload) throw new Error(ErrorMessage.LOGGED_IN);
        } else {
          if (googleCallback) {
            const { access_token } = await this.googleAuthService.getToken(request);
            await this.googleAuthService.verifyAccessToken(access_token);
            const { id } = await this.googleAuthService.getUserInfo(access_token);
            await this.googleAuthService.logout(access_token);
            request.user = { id };
          } else if (appleCallback) {
            await this.appleAuthService.getToken(request);
          }
        }
        return true;
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
        const where: Prisma.AuthWhereInput = refreshToken && { refreshToken };
        await this.prisma.auth.deleteMany({ where });
        this.credentialsServuice.removeCookie(response);
        if (isLogin) return true;
        else throw new UnauthorizedException(error.message);
      } else if (error.message === ErrorMessage.LOGGED_IN) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
