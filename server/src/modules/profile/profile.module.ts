import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Module({
  imports: [HttpModule],
  providers: [ProfileService],
  controllers: [],
})
export class ProfileModule {}
