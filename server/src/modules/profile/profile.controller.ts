import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtGuard } from '../../common/guards';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createFinancialProfile(@Body() data: any) {
    return await this.profileService.createFinancialProfile(data);
  }
}
