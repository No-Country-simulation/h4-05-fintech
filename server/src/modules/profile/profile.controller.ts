import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { JwtGuard } from '../../common/guards';
import { UserRequest } from '../../common/interfaces/user-request.interface';

import { ProfileService } from './profile.service';
import { FinancialProfileDto } from './dto';
import { FinancialProfileSuccess, UserProfileDataResponse } from './profile-success.response';

@UseGuards(JwtGuard)
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('financial')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Questions for financial profile' })
  @ApiBody({ type: FinancialProfileDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to access' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Profile created' })
  @ApiCreatedResponse(FinancialProfileSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async createFinancialProfile(@Req() req: UserRequest, @Body() dto: FinancialProfileDto) {
    return await this.profileService.createFinancialProfile(req, dto);
  }

  @Get('data')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to access' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse(UserProfileDataResponse)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async getUserProfile(@Req() req: UserRequest) {
    return await this.profileService.getUserProfile(req);
  }
}
