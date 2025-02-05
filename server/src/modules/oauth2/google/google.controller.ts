import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTemporaryRedirectResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { GoogleCallback, IsLogin } from '../../../common/decorators';
import { UserRequest } from '../../../common/interfaces';
import { OAuth2Guard } from '../../../common/guards';

import { GoogleAuthService } from './google.service';

@Controller('oauth2/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @IsLogin()
  @UseGuards(OAuth2Guard)
  @Get('login')
  @ApiTemporaryRedirectResponse({ description: 'Successfully redirected to Google' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  async login() {
    return await this.googleAuthService.login();
  }

  @IsLogin()
  @GoogleCallback()
  @UseGuards(OAuth2Guard)
  @Get('callback')
  @ApiBadRequestResponse({ description: 'Bad request on google authentication' })
  @ApiOkResponse({ description: 'Successfully logged in with google' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  async callback(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    return await this.googleAuthService.callback(req, res);
  }
}
