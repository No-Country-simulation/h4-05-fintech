import { Controller, Get, Post, Param, Body, Req, Res, HttpCode, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNotAcceptableResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { UserRequest } from '../../common/interfaces/user-request.interface';
import { IsLogin } from '../../common/decorators/is-login.decorator';
import { JwtRefreshGuard } from '../../common/guards/jwt-refresh.guard';
import { Digit32HexCodePipe } from '../../common/pipes';

import { AuthService } from './auth.service';
import { LoginDto, RegistryDto } from './dto';
import {
  RegistrySuccess,
  VerifySuccess,
  LoginSucess,
  LogoutSuccess,
} from './auth-success.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registry')
  @ApiOperation({ summary: 'Resgister a new user' })
  @ApiBody({ type: RegistryDto, required: true })
  @ApiBadRequestResponse({ description: `incoming data is invalid, or the passwords don't match` })
  @ApiConflictResponse({ description: 'User already registered' })
  @ApiCreatedResponse(RegistrySuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async registry(@Body() data: RegistryDto) {
    return await this.authService.registry(data);
  }

  @Get('verify/:code')
  @ApiOperation({ summary: 'Verify registered user' })
  @ApiParam({ name: 'code', description: 'must be a valid 32-digit hex code', required: true })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiNotAcceptableResponse({ description: 'Invalid 32-digit hex code' })
  @ApiOkResponse(VerifySuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async verify(@Param('code', new Digit32HexCodePipe()) code: string) {
    return await this.authService.verify(code);
  }

  @Post('login')
  @IsLogin()
  @UseGuards(JwtRefreshGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login and get credentials' })
  @ApiBody({ type: LoginDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid, or already logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'User not verified' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse(LoginSucess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async login(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() data: LoginDto,
  ) {
    return await this.authService.login(req, res, data);
  }

  @Get('logout')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Logout and erase credentials' })
  @ApiBadRequestResponse({ description: 'Not logged in' })
  @ApiOkResponse(LogoutSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async logout(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req, res);
  }
}
