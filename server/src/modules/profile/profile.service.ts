import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { PrismaService } from '../../common/modules/prisma/prisma.service';
import config from '../../config';
import { UserRequest } from 'src/common/interfaces/user-request.interface';
import { FinancialProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async createFinancialProfile(req: UserRequest, dto: FinancialProfileDto) {
    const { id: userId } = req.user;
    await this.prisma.financialProfile.create({ data: { userId, ...dto } });
    const result = await firstValueFrom(
      this.httpService.post(`${this.configService.dataModelUrl}`, dto, {
        headers: {},
      }),
    );
    return result;
  }
}
