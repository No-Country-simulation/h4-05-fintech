import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
// import { Prisma } from '@prisma/client';

import { PrismaService } from '../../common/modules/prisma/prisma.service';
import config from '../../config';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async createFinancialProfile(data: any) {
    // const data: Prisma.FinancialProfileCreateInput = {};
    // await this.prisma.financialProfile.create({ data });
    const result = await firstValueFrom(
      this.httpService.post(`${this.configService.dataModelUrl}`, data, {
        headers: {},
      }),
    );
    return result;
  }
}
