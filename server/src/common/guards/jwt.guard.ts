import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { Socket } from 'socket.io';

import { ErrorMessage } from '../enums';
import { UserRequest } from '../interfaces/user-request.interface';
import { CredentialsService } from '../modules/credentials/credentials.service';
import { Reflector } from '@nestjs/core';
import { IS_WEBSOCKETS } from '../decorators';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly credentialsService: CredentialsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isWebSockets = this.reflector.get<boolean>(IS_WEBSOCKETS, context.getHandler());

    try {
      if (isWebSockets) {
        const client = context.switchToWs().getClient<Socket>();
        const accessToken = await this.credentialsService.extractTokenFromClientHeader(client);
        await this.credentialsService.verifyAccessToken(accessToken);
        return true;
      } else {
        const request = context.switchToHttp().getRequest<UserRequest>();
        const accessToken = await this.credentialsService.extractJwtFromBearerHeader(request);
        const payload = await this.credentialsService.verifyAccessToken(accessToken);
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
