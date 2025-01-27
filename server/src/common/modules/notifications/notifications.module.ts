import { Module, Global } from '@nestjs/common';
import { NotificationsGateway } from './notificattion.gateway';

@Global()
@Module({
  providers: [NotificationsGateway],
})
export class GatewaysModule {}
