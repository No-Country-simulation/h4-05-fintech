import { Controller, Post, Body } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';

@Controller()
export class SeederController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('seed')
  @ApiExcludeEndpoint()
  async seed(@Body() body: { seeds: object[]; modelName: string }) {
    await this.prismaService.seed(body.seeds, body.modelName);
  }

  @Post('truncate')
  @ApiExcludeEndpoint()
  async truncate(@Body() modelName: string) {
    await this.prismaService.trucate(modelName);
  }
}
