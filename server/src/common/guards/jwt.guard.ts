import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';

import { ErrorMessage } from '../enums';
import { UserRequest } from '../interfaces/user-request.interface';
import { CredentialsService } from '../modules/credentials/credentials.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly credentialsService: CredentialsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<UserRequest>();
      const accessToken = await this.credentialsService.extractJwtFromBearerHeader(request);
      const payload = await this.credentialsService.verifyAccessToken(accessToken);
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
        throw new UnauthorizedException(ErrorMessage.NO_ACCESS);
      }
    }
  }
}
