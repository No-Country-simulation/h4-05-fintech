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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';

import { UserRequest } from '../../common/interfaces';
import { IsLogin } from '../../common/decorators/is-login.decorator';
import { JwtGuard, JwtRefreshGuard } from '../../common/guards';

import { AuthService } from './auth.service';
import { LoginDto, RegistryDto, ResetPasswordDto, SendEmailDto, ChangePasswordDto } from './dto';
import {
  RegistrySuccess,
  VerifySuccess,
  LoginSucess,
  LogoutSuccess,
  PasswordRecoveryInitialized,
  RefreshSucess,
  PasswordChangeSuccess,
  PasswordResetSuccess,
  VerificationResendSuccess,
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
  async registry(@Body() body: RegistryDto) {
    return await this.authService.registry(body);
  }

  @Post('resend-verification')
  @HttpCode(200)
  @ApiOperation({ summary: 'Resend verification email' })
  @ApiBody({ type: SendEmailDto, required: true })
  @ApiBadRequestResponse({ description: `Incoming data is invalid, or user verified` })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse(VerificationResendSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async resendVerification(@Body() body: SendEmailDto) {
    return await this.authService.resendVerification(body);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify registered user' })
  @ApiQuery({ name: 'code', required: true })
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
    @Body() body: LoginDto,
  ) {
    return await this.authService.login(req, res, body);
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh session' })
  @ApiBadRequestResponse({ description: 'Not logged in' })
  @ApiOkResponse(RefreshSucess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async refresh(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    return await this.authService.refresh(req, res);
  }

  @Put('password-change')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change Password' })
  @ApiBody({ type: ChangePasswordDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid' })
  @ApiConflictResponse({ description: 'The passwords are equal' })
  @ApiCreatedResponse(PasswordChangeSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async changePassword(@Req() req: UserRequest, @Body() body: ChangePasswordDto) {
    return await this.authService.changePassword(req.user.id, body);
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Password recovery process' })
  @ApiBody({ type: SendEmailDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse(PasswordRecoveryInitialized)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async forgotPassword(@Body() body: SendEmailDto) {
    return await this.authService.forgotPassword(body);
  }

  @Put('password-reset')
  @ApiOperation({ summary: 'Reset Password' })
  @ApiQuery({ name: 'code', required: true })
  @ApiBody({ type: ResetPasswordDto, required: true })
  @ApiBadRequestResponse({ description: `Incoming data is invalid, or the passwords don't match` })
  @ApiUnauthorizedResponse({ description: 'Time to reset password expired' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiCreatedResponse(PasswordResetSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async resetPassword(@Query('code') code: string, @Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(code, body);
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
