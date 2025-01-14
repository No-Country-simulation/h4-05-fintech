import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../common/modules/prisma/prisma.service';
import { IFindUserBy, IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(findUserBy: IFindUserBy) {
    const { id, email, code } = findUserBy;
    const where: Prisma.UserWhereInput =
      (id && { id }) || (email && { email }) || (code && { code });
    const user = await this.prisma.user.findFirst({ where });
    return user;
  }

  async createUser(user: IUser): Promise<void> {
    const { email, password, code } = user;
    await this.prisma.user.create({ data: { email, password, code } });
  }

  async updateUser(user: User) {
    const where: Prisma.UserWhereUniqueInput = { id: user.id };
    const data: Prisma.UserUpdateInput = { ...user };
    await this.prisma.user.update({ where, data });
  }
}
