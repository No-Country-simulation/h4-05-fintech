import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegistryDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registry')
  @ApiBody({ type: RegistryDto, required: true })
  @ApiBadRequestResponse({ description: `incoming data is invalid, or the passwords don't match` })
  @ApiConflictResponse({ description: 'User already registered' })
  @ApiCreatedResponse({ description: 'User successfully registered!' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async registry(@Body() data: RegistryDto) {
    return await this.authService.registry(data);
  }
}
