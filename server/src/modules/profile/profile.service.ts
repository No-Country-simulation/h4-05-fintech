import fs from 'node:fs';

import {
  BadRequestException,
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
import {
  FinancialProfileResults,
  ICreateProfile,
  RecommendationTypes,
  SendProfileToModel,
} from './profile.interface';

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
    const userProfileFound = await this.prisma.userProfile.findFirst({
      where: { userId: req.user.id },
    });

    if (userProfileFound.surveyAnswered) throw new ConflictException(ErrorMessage.PROFILE_CREATED);

    const { id: userProfileId } = userProfileFound;
    const where: Prisma.UserProfileWhereUniqueInput = { id: userProfileFound.id };

    const sendData: SendProfileToModel = {
      objetivo_financiero: dto.financialGoals,
      horizonte_tiempo: dto.investmentTimeframes,
      conocimiento_inversiones: dto.investmentKnowledge,
      formacion: dto.financialEducation,
      instrumentos_invertidos: dto.investmentExperience,
      reaccion_perdida: dto.riskReactions,
      fuente_ingresos: dto.incomeSources,
      ingresos_mensuales: dto.incomeRanges,
      gastos_mensuales: dto.expenseRatios,
    };

    const results = await this.getPrediction(sendData);

    const userProfileUpdated = Object.assign(userProfileFound, {
      surveyAnswered: false,
      updatedAt: new Date(),
      financialProfileResults: results.perfil_riesgo,
    });

    const data: Prisma.UserProfileUpdateInput = { ...userProfileUpdated };
    await this.prisma.userProfile.update({ where, data });

    await this.prisma.financialProfile.create({ data: { userProfileId, ...dto } });
  }

  async createUserProfile(userId: string, body?: ICreateProfile) {
    await this.prisma.userProfile.create({ data: { userId, ...body } });
  }

  async getUserProfile(req: UserRequest) {
    let profile: string | null = null;
    let recommendations: RecommendationTypes[] | null = null;
    let tips: string[] | null = null;

    const { id: userId } = req.user;
    const userProfileFound = await this.prisma.userProfile.findFirst({
      where: { userId },
      include: {
        financialProfileData: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!userProfileFound) throw new NotFoundException(ErrorMessage.USER_PROFILE_NOT_FOUND);

    const {
      name,
      lastname,
      age,
      image,
      occupation,
      itemsSaved,
      surveyAnswered,
      user,
      financialProfileData,
    } = userProfileFound;

    if (financialProfileData) {
      const sendData: SendProfileToModel = {
        objetivo_financiero: financialProfileData.financialGoals,
        horizonte_tiempo: financialProfileData.investmentTimeframes,
        conocimiento_inversiones: financialProfileData.investmentKnowledge,
        formacion: financialProfileData.financialEducation,
        instrumentos_invertidos: financialProfileData.investmentExperience,
        reaccion_perdida: financialProfileData.riskReactions,
        fuente_ingresos: financialProfileData.incomeSources,
        ingresos_mensuales: financialProfileData.incomeRanges,
        gastos_mensuales: financialProfileData.expenseRatios,
      };
      const { perfil_riesgo, recomendaciones, tips_ahorro_inversion } =
        await this.getPrediction(sendData);

      profile = perfil_riesgo;
      recommendations = recomendaciones;
      tips = tips_ahorro_inversion;
    }

    const response = {
      name,
      lastname,
      age,
      occupation,
      image,
      itemsSaved,
      email: user.email,
      surveyAnswered,
      profile,
      recommendations,
      tips,
    };

    return response;
  }

  async updateUserProfile(req: UserRequest, body: UpdateProfileDto) {
    const { id: userId } = req.user;
    const userProfileFound = await this.prisma.userProfile.findFirst({
      where: { userId },
    });

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

  async getPrediction(sendData: SendProfileToModel) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<FinancialProfileResults>(
          `${this.configService.dataModelUrl}/predict`,
          sendData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
