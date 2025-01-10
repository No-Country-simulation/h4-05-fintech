import { Controller, Post, Body } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';

@Controller()
export class SeederController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('seeder')
  @ApiExcludeEndpoint()
  async seeder(@Body() body: { seeds: object[]; modelName: string }) {
    await this.prismaService.seeder(body.seeds, body.modelName);
  }
}
