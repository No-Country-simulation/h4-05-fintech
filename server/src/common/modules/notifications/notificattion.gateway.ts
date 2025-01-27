import { UseFilters, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { IsWebSockets } from '../../decorators';
import { JwtGuard } from '../../guards';
import { WebSocketExceptionFilter } from '../../../common/filters';

@UseFilters(WebSocketExceptionFilter)
@UseGuards(JwtGuard)
@WebSocketGateway({ cors: true, namespace: '/notifications' })
export class NotificationsGateway {
  @WebSocketServer() public server: Server;

  @IsWebSockets()
  @SubscribeMessage('notification')
  async handleNotifications(@MessageBody() message: any) {
    console.log(message);
  }
}
