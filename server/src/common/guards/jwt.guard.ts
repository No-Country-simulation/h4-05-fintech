import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { JwtService, TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';

import config from '../../config';
import { Environment, ErrorMessage } from '../enums';
import { JwtPayload, UserRequest } from '../interfaces/user-request.interface';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  private accessSercret =
    this.configService.nodeEnv === Environment.PRODUCTION
      ? this.configService.jwt.accessSecret
      : 'access-secret';

  private extractJwtFromBearerHeader(req: UserRequest): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyJwt(token: string): Promise<JwtPayload> {
    const payload = this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.accessSercret,
    });
    return payload;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<UserRequest>();
      const token = this.extractJwtFromBearerHeader(request);
      const payload = await this.verifyJwt(token);
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
        throw new UnauthorizedException(ErrorMessage.NO_ACCESS);
      }
    }
  }
}
