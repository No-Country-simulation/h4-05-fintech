import { Controller, Post, Body, Req, Res, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
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
import { LoginSucess, RegistrySuccess } from './auth-success.response';
import { UserRequest } from '../../common/interfaces/user-request.interface';

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
}
