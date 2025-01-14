import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { JwtService, TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { CookieOptions, Response } from 'express';

import config from '../../config';
import { IS_LOGIN } from '../decorators/is-login.decorator';
import { Environment, ErrorMessage } from '../enums';
import { JwtPayload, UserRequest } from '../interfaces/user-request.interface';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  private cookieName =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.cookieName
      : 'refresh-cookie';

  private refreshSercret =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.jwt.refreshSecret
      : 'refresh-secret';

  private extractJwtFromCookie(req: UserRequest): string | undefined {
    const [cookieName, cookieValue] = req.headers.cookie?.split('=') ?? [];
    return cookieName === this.cookieName ? cookieValue : undefined;
  }

  private async verifyJwt(token: string): Promise<JwtPayload> {
    const payload = this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.refreshSercret,
    });
    return payload;
  }

  private removeCookie(res: Response) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: this.configService.nodeEnv === Environment.PRODUCTION ? true : false,
      sameSite: 'none',
    };
    res.clearCookie(this.cookieName, options);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isLogin = this.reflector.get<boolean>(IS_LOGIN, context.getHandler());
    const req = context.switchToHttp().getRequest<UserRequest>();
    const res = context.switchToHttp().getResponse<Response>();
    const refreshToken = this.extractJwtFromCookie(req);

    try {
      if (!isLogin) {
        const payload = await this.verifyJwt(refreshToken);
        req.user = payload;
        return true;
      } else {
        if (refreshToken) {
          const payload = await this.verifyJwt(refreshToken);
          if (payload) throw new Error(ErrorMessage.LOGGED_IN);
        }
        return true;
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
        const where: Prisma.AuthWhereInput = refreshToken && { refreshToken };
        await this.prisma.auth.deleteMany({ where });
        this.removeCookie(res);
        if (isLogin) return true;
        else throw new BadRequestException(ErrorMessage.NOT_LOGGED_IN);
      } else if (error.message === ErrorMessage.LOGGED_IN) {
        throw new BadRequestException(error.message);
      }
    }
    return true;
  }
}
