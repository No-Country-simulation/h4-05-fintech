import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google/google.service';
import { AppleAuthService } from './apple/apple.service';
import { GoogleAuthController } from './google/google.controller';
import { AppleAuthController } from './apple/apple.controller';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule.register({}), UserModule, ProfileModule],
  providers: [GoogleAuthService, AppleAuthService],
  controllers: [GoogleAuthController, AppleAuthController],
})
export class OAuth2Module {}
