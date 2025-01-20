import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './common/modules/prisma/prisma.module';
import { MailerModule } from './common/modules/mailer/mailer.module';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';

import config from './config';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigProvider } from './cache-config.provider';
import { FileUploaderModule } from './common/modules/file-uploader/file-uploader.module';

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    FileUploaderModule,
    UserModule,
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigProvider,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
