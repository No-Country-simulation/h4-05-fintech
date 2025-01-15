import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtGuard } from '../../common/guards';
import { UserRequest } from '../../common/interfaces/user-request.interface';

import { ProfileService } from './profile.service';
import { FinancialProfileDto } from './dto';
import { FinancialProfileSuccess } from './profile-success.response';

@UseGuards(JwtGuard)
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Questions for financial profile' })
  @ApiBearerAuth()
  @ApiBody({ type: FinancialProfileDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to access' })
  @ApiCreatedResponse(FinancialProfileSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async createFinancialProfile(@Req() req: UserRequest, @Body() dto: FinancialProfileDto) {
    return await this.profileService.createFinancialProfile(req, dto);
  }
}
