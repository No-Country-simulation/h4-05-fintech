import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Prisma } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { UserRequest } from '../../common/interfaces/user-request.interface';

import config from '../../config';
import { FinancialProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async createFinancialProfile(req: UserRequest, dto: FinancialProfileDto) {
    const { id, id: userId } = req.user;

    const where: Prisma.UserWhereUniqueInput = { id };
    const data: Prisma.UserUpdateInput = { profileCreated: true, updatedAt: new Date() };

    await this.prisma.financialProfile.create({ data: { userId, ...dto } });
    await this.prisma.user.update({ where, data });

    const result = await firstValueFrom(
      this.httpService.post(`${this.configService.dataModelUrl}`, dto, {
        headers: {},
      }),
    );
    return result;
  }
}
