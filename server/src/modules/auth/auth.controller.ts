import { Controller, Get, Post, Param, Body, Req, Res, HttpCode } from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNotAcceptableResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegistryDto } from './dto';
import { UserRequest } from '../../common/interfaces/user-request.interface';
import { Digit32HexCodePipe } from '../../common/pipes';
import { RegistrySuccess, VerifySuccess, LoginSucess } from './auth-success.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registry')
  @ApiBody({ type: RegistryDto, required: true })
  @ApiBadRequestResponse({ description: `incoming data is invalid, or the passwords don't match` })
  @ApiConflictResponse({ description: 'User already registered' })
  @ApiCreatedResponse(RegistrySuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async registry(@Body() data: RegistryDto) {
    return await this.authService.registry(data);
  }

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto, required: true })
  @ApiBadRequestResponse({ description: 'incoming data is invalid' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiOkResponse(LoginSucess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async login(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() data: LoginDto,
  ) {
    return await this.authService.login(req, res, data);
  }

  @Get('/verify/:code')
  @ApiParam({ name: 'code', description: 'must be a valid 32-digit hex code', required: true })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiNotAcceptableResponse({ description: 'Invalid 32-digit hex code' })
  @ApiOkResponse(VerifySuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async verify(@Param('code', new Digit32HexCodePipe()) code: string) {
    return await this.authService.verify(code);
  }
}
