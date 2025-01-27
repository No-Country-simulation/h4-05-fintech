import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTemporaryRedirectResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { AppleCallback, IsLogin } from '../../../common/decorators';
import { OAuth2Guard } from '../../../common/guards';

import { AppleAuthService } from './apple.service';

@Controller('oauth2/apple')
export class AppleAuthController {
  constructor(private readonly appleAuthService: AppleAuthService) {}

  @IsLogin()
  @UseGuards(OAuth2Guard)
  @Get('login')
  @ApiTemporaryRedirectResponse({ description: 'Successfully redirected to Apple' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  async login() {
    return await this.appleAuthService.login();
  }

  @Get('callback')
  @IsLogin()
  @AppleCallback()
  @UseGuards(OAuth2Guard)
  @ApiBadRequestResponse({ description: 'Bad request on google authentication' })
  @ApiOkResponse({ description: 'Successfully logged in with google' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  async getGoogleToken(@Req() req: Request) {
    return await this.appleAuthService.getToken(req);
  }
}
