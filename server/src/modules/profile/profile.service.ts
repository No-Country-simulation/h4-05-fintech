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
import { ICreateProfile, SendProfileToModel } from './profile.interface';

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
    let prediction: string;
    try {
      const userProfileFound = await this.getUserProfile(req);

      if (userProfileFound.surveyAnswered)
        throw new ConflictException(ErrorMessage.PROFILE_CREATED);

      const { id: userProfileId } = userProfileFound;
      const where: Prisma.UserProfileWhereUniqueInput = { id: userProfileFound.id };

      if (this.configService.nodeEnv === Environment.DEVELOPMENT) {
        prediction = await this.getPrediction(userProfileFound, dto);

        const userProfileUpdated = Object.assign(userProfileFound, {
          surveyAnswered: false,
          updatedAt: new Date(),
          financialProfileResults: prediction,
        });

        const data: Prisma.UserProfileUpdateInput = { ...userProfileUpdated };
        await this.prisma.userProfile.update({ where, data });
      }

      const userProfileUpdated = Object.assign(userProfileFound, {
        surveyAnswered: false,
        updatedAt: new Date(),
      });

      const data: Prisma.UserProfileUpdateInput = { ...userProfileUpdated };
      await this.prisma.userProfile.update({ where, data });

      await this.prisma.financialProfile.create({ data: { userProfileId, ...dto } });

      return { message: `Tu perfil financiero es ${prediction}` };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUserProfile(userId: string, body?: ICreateProfile) {
    await this.prisma.userProfile.create({ data: { userId, ...body } });
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

  async getPrediction(userProfile: UserProfile, dto: FinancialProfileDto) {
    try {
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

      const response = await firstValueFrom(
        this.httpService.post<{ prediccion: string }>(
          `${this.configService.dataModelUrl}/predict`,
          sendData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const { prediccion } = response.data;
      return prediccion;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getRecommendations() {
    const data = {
      income_source: 'SALARIO',
      target_period: 'Largo plazo',
      expenses_average: '<30%',
      risk_tolerance: 'Moderado',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.configService.dataModelUrl}/recommendations`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
