import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { NotificationsGateway } from './notificattion.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}
  async onModuleInit() {
    console.log('Inicializando temporarizadores...');
  }

  async onModuleDestroy() {
    console.log('Destruyendo temporizadores');
  }
}
