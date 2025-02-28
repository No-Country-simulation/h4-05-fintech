import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [UserModule, ProfileModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
