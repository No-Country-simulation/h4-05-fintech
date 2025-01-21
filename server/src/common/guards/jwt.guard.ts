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
import { Socket } from 'socket.io';

import config from '../../config';
import { Environment, ErrorMessage } from '../enums';
import { JwtPayload, UserRequest } from '../interfaces/user-request.interface';
import { IS_WEBSOCKETS } from '../decorators';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
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

  private extractTokenFromClientHeader(client: Socket): string | undefined {
    const { authentication } = client.handshake.headers;
    return authentication as string;
  }

  private async verifyJwt(token: string): Promise<JwtPayload> {
    const payload = this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.accessSercret,
    });
    return payload;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isWebSockets = this.reflector.get<boolean>(IS_WEBSOCKETS, context.getHandler());

    try {
      if (isWebSockets) {
        const client = context.switchToWs().getClient<Socket>();
        const token = this.extractTokenFromClientHeader(client);
        const payload = await this.verifyJwt(token);
        const data = context.switchToWs().getData();
        data['user'] = payload;
        return true;
      } else {
        const request = context.switchToHttp().getRequest<UserRequest>();
        const token = this.extractJwtFromBearerHeader(request);
        const payload = await this.verifyJwt(token);
        request.user = payload;
        return true;
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
        throw new UnauthorizedException(ErrorMessage.NO_ACCESS);
      }
    }
  }
}
