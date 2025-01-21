import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { IsWebSockets } from '../../decorators';
import { JwtGuard } from '../../guards';

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;

  async handleConnection(client: Socket) {
    console.log(client.handshake);
  }

  handleDisconnect(client: Socket) {
    console.log(client.handshake);
  }

  @IsWebSockets()
  @UseGuards(JwtGuard)
  @SubscribeMessage('notification')
  async handleNotifications(@ConnectedSocket() client: Socket) {
    const { username } = client.handshake.headers;
    console.log(username);
  }
}
