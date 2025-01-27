import { Module, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotificationsGateway } from './notificattion.gateway';

@Global()
@Module({
  providers: [NotificationsGateway, JwtService],
})
export class GatewaysModule {}
