import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './common/modules/prisma/prisma.service';

import { UserModule } from './modules/user/user.module';

import config from './config';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
