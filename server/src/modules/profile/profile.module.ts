import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [HttpModule, UserModule],
  providers: [ProfileService, JwtService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
