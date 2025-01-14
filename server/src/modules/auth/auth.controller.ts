import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNotAcceptableResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegistryDto } from './dto';
import { Digit32HexCodePipe } from '../../common/pipes';
import { RegistrySuccess, VerifySuccess } from './auth-success.response';

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
