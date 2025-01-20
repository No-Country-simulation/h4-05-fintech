import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { ICreateUser, IFindUserBy } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(findUserBy: IFindUserBy) {
    const { id, email, verificationCode, resetPasswordCode } = findUserBy;

    const where: Prisma.UserWhereInput =
      (id && { id }) ||
      (email && { email }) ||
      (verificationCode && { verificationCode }) ||
      (resetPasswordCode && { resetPasswordCode });

    const user = await this.prisma.user.findFirst({ where });
    return user;
  }

  async createUser(user: ICreateUser): Promise<User> {
    const data: Prisma.UserCreateInput = user;
    return await this.prisma.user.create({ data });
  }

  async updateUser(user: User) {
    const where: Prisma.UserWhereUniqueInput = { id: user.id };
    const data: Prisma.UserUpdateInput = { ...user, updatedAt: new Date() };
    await this.prisma.user.update({ where, data });
  }
}
