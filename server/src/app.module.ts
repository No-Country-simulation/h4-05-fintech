import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './common/modules/prisma/prisma.module';

import { UserModule } from './modules/user/user.module';

import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from './common/modules/mailer/mailer.module';

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
