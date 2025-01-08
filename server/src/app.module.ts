import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
