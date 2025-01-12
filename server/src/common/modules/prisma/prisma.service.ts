import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async seed(seeds: object[], modelName: string) {
    await this[modelName].createMany({ data: seeds });
  }

  async trucate(modelName: string) {
    await this[modelName].deleteMany();
  }
}
