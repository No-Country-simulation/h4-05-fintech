import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/modules/prisma/prisma.module';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async createUser(data: IUser): Promise<void> {
    await this.prisma.user.create({ data: { email: data.email, password: data.password } });
  }
}
