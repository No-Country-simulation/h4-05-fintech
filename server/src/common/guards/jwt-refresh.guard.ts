import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { IS_LOGIN } from '../decorators/is-login.decorator';
import { ErrorMessage } from '../enums';
import { UserRequest } from '../interfaces/user-request.interface';
import { PrismaService } from '../modules/prisma/prisma.service';
import { CredentialsService } from '../modules/credentials/credentials.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
    private readonly credentialsService: CredentialsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isLogin = this.reflector.get<boolean>(IS_LOGIN, context.getHandler());
    const req = context.switchToHttp().getRequest<UserRequest>();
    const res = context.switchToHttp().getResponse<Response>();
    const refreshToken = await this.credentialsService.extractJwtFromCookie(req);

    try {
      if (!isLogin) {
        await this.credentialsService.verifyRefreshToken(refreshToken);
        return true;
      } else {
        if (refreshToken) {
          const payload = await this.credentialsService.verifyRefreshToken(refreshToken);
          if (payload) throw new Error(ErrorMessage.LOGGED_IN);
        }
        return true;
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
        const where: Prisma.AuthWhereInput = refreshToken && { refreshToken };
        await this.prisma.auth.deleteMany({ where });
        await this.credentialsService.removeCookie(res);
        if (isLogin) return true;
        else throw new BadRequestException(ErrorMessage.NOT_LOGGED_IN);
      } else if (error.message === ErrorMessage.LOGGED_IN) {
        throw new BadRequestException(error.message);
      }
    }
    return true;
  }
}
