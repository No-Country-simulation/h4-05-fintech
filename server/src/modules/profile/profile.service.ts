import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Prisma } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { UserRequest } from '../../common/interfaces/user-request.interface';
import { ErrorMessage } from '../../common/enums';

import config from '../../config';
import { FinancialProfileDto, UserProfileDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  async createFinancialProfile(req: UserRequest, dto: FinancialProfileDto) {
    const { id, id: userId } = req.user;

    const userFound = await this.userService.getUser({ id });

    if (!userFound) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (userFound.profileCreated) throw new ConflictException(ErrorMessage.PROFILE_CREATED);

    const userUpdated = Object.assign(userFound, { profileCreated: true, updatedAt: new Date() });

    await this.prisma.financialProfile.create({ data: { userId, ...dto } });
    await this.userService.updateUser(userUpdated);

    // Cuando data ya tenga su modelo funcionando, implementará esta lógica

    // if (this.configService.nodeEnv === Environment.PRODUCTION)
    //   return await this.getFinancialProfileFromData(this.configService.dataModelUrl, dto);
    // else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
    //   return await this.getFinancialProfileFromData(this.configService.dataModelUrl, dto);
    // else return { message: 'financial profile successfully created' };

    // En el mientras tanto...
    return { message: 'financial profile successfully created' };
  }

  async createUserProfile(userId: string) {
    await this.prisma.userProfile.create({ data: { userId } });
  }

  async getFinancialProfile(req: UserRequest) {
    const { id: userId } = req.user;
    const financialProfileFound = await this.prisma.financialProfile.findFirst({
      where: { userId },
    });

    if (!financialProfileFound)
      throw new NotFoundException(ErrorMessage.FINANCIAL_PROFILE_NOT_FOUND);

    return financialProfileFound;
  }

  async getFinancialProfileFromData(url: string, dto: FinancialProfileDto) {
    return await firstValueFrom(
      this.httpService.post(`${url}`, dto, {
        headers: {},
      }),
    );
  }

  async getUserProfile(req: UserRequest) {
    const { id: userId } = req.user;
    const userProfileFound = await this.prisma.userProfile.findFirst({
      where: { userId },
    });

    if (!userProfileFound) throw new NotFoundException(ErrorMessage.USER_PROFILE_NOT_FOUND);

    return userProfileFound;
  }

  async updateUserProfile(req: UserRequest, body: UserProfileDto) {
    const { id: userId } = req.user;
    const where: Prisma.UserProfileWhereUniqueInput = { userId };
    const data: Prisma.UserProfileUpdateInput = { ...body, updatedAt: new Date() };
    await this.prisma.userProfile.update({ where, data });
  }
}
