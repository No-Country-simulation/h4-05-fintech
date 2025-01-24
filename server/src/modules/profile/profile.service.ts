import fs from 'node:fs';

import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Prisma, UserProfile } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { FileUploaderService } from '../../common/modules/file-uploader/file-uploader.service';
import { UserRequest } from '../../common/interfaces';
import { Environment, ErrorMessage } from '../../common/enums';

import config from '../../config';
import { FinancialProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  private localStorage = (userProfile: UserProfile, body: UpdateProfileDto) =>
    fs.unlink(userProfile.image, async (err) => {
      if (err) {
        const { path } = body.image;
        const profileUpdated = Object.assign(userProfile, { ...body, image: path });
        const where: Prisma.UserProfileWhereUniqueInput = { id: userProfile.id };
        const data: Prisma.UserProfileUpdateInput = { ...profileUpdated, updatedAt: new Date() };
        await this.prisma.userProfile.update({ where, data });
      } else {
        const { path } = body.image;
        const profileUpdated = Object.assign(userProfile, { ...body, image: path });
        const where: Prisma.UserProfileWhereUniqueInput = { id: userProfile.id };
        const data: Prisma.UserProfileUpdateInput = { ...profileUpdated, updatedAt: new Date() };
        await this.prisma.userProfile.update({ where, data });
      }
    });

  private remoteStorage = async (userProfile: UserProfile, body: UpdateProfileDto) => {
    try {
      const { id } = userProfile;
      const { image } = body;
      const { secure_url } = await this.fileUploaderService.uploadFile('profile', id, image);
      const profileUpdated = Object.assign(userProfile, { ...body, avatar: secure_url });
      const where: Prisma.UserProfileWhereUniqueInput = { id: userProfile.id };
      const data: Prisma.UserProfileUpdateInput = { ...profileUpdated, updatedAt: new Date() };
      await this.prisma.userProfile.update({ where, data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  async createFinancialProfile(req: UserRequest, dto: FinancialProfileDto) {
    const userProfileFound = await this.getUserProfile(req);

    if (userProfileFound.surveyAnswered) throw new ConflictException(ErrorMessage.PROFILE_CREATED);

    const userProfileUpdated = Object.assign(userProfileFound, {
      surveyAnswered: true,
      updatedAt: new Date(),
    });

    const { id: userProfileId } = userProfileFound;

    await this.prisma.financialProfile.create({ data: { userProfileId, ...dto } });

    const where: Prisma.UserProfileWhereUniqueInput = { id: userProfileFound.id };
    const data: Prisma.UserProfileUpdateInput = { ...userProfileUpdated };
    await this.prisma.userProfile.update({ where, data });

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

  async updateUserProfile(req: UserRequest, body: UpdateProfileDto) {
    const userProfileFound = await this.getUserProfile(req);

    if (body.image) {
      if (this.configService.nodeEnv === Environment.PRODUCTION)
        await this.remoteStorage(userProfileFound, body);
      else this.localStorage(userProfileFound, body);
    } else if (!body.image) {
      const updatedProfile = Object.assign(userProfileFound, body);
      const where: Prisma.UserProfileWhereUniqueInput = { id: userProfileFound.id };
      const data: Prisma.UserProfileUpdateInput = { ...updatedProfile, updatedAt: new Date() };
      await this.prisma.userProfile.update({ where, data });
    }
    return { message: 'User profile successfully updated' };
  }
}
