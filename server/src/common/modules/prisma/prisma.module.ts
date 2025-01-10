import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SeederController } from './prisma.controller';

@Global()
@Module({
  providers: [PrismaService],
  controllers: [SeederController],
  exports: [PrismaService],
})
export class PrismaModule {}
