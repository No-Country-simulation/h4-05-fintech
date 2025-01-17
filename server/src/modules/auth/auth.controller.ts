import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Body,
  Req,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNotAcceptableResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Response } from 'express';

import { UserRequest } from '../../common/interfaces/user-request.interface';
import { IsLogin } from '../../common/decorators/is-login.decorator';
import { JwtRefreshGuard } from '../../common/guards';

import { AuthService } from './auth.service';
import {
  LoginDto,
  RegistryDto,
  ResetPasswordQueryDto,
  ResetPasswordDto,
  ForgotPasswordDto,
} from './dto';
import {
  RegistrySuccess,
  VerifySuccess,
  LoginSucess,
  LogoutSuccess,
  PasswordRecoveryInitialized,
  RefreshSucess,
} from './auth-success.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registry')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegistryDto, required: true })
  @ApiBadRequestResponse({ description: `Incoming data is invalid, or the passwords don't match` })
  @ApiConflictResponse({ description: 'User already registered' })
  @ApiCreatedResponse(RegistrySuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async registry(@Body() dto: RegistryDto) {
    return await this.authService.registry(dto);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify registered user' })
  @ApiQuery({ name: 'code', type: RegExp, pattern: '/^[a-f0-9]{64}$/i', required: true })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiNotAcceptableResponse({ description: 'Invalid 32-digit hex code' })
  @ApiOkResponse(VerifySuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async verify(@Query('code') code: string) {
    return await this.authService.verify(code);
  }

  @Post('login')
  @IsLogin()
  @UseGuards(JwtRefreshGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login and get credentials' })
  @ApiBody({ type: LoginDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid, or already logged in' })
  @ApiForbiddenResponse({ description: 'User not verified' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiOkResponse(LoginSucess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async login(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    return await this.authService.login(req, res, dto);
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Refresh session' })
  @ApiBadRequestResponse({ description: 'Not logged in' })
  @ApiOkResponse(RefreshSucess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async refresh(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    return await this.authService.refresh(req, res);
  }

  @Post('password-recovery')
  @HttpCode(200)
  @ApiOperation({ summary: 'Password recovery process' })
  @ApiQuery({ type: ResetPasswordQueryDto, required: true })
  @ApiBody({ type: ResetPasswordDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse(PasswordRecoveryInitialized)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async recoverPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body);
  }

  @Put('password-reset')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reset Password' })
  @ApiQuery({ type: ResetPasswordQueryDto, required: true })
  @ApiBody({ type: ResetPasswordDto, required: true })
  @ApiBadRequestResponse({ description: `Incoming data is invalid, or the passwords don't match` })
  @ApiUnauthorizedResponse({ description: 'Time to reset password expired' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse(LoginSucess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async resetPassword(@Query() query: ResetPasswordQueryDto, @Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(query, body);
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
