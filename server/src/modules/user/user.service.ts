import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/modules/prisma/prisma.module';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: IUser): Promise<void> {
    await this.prisma.user.create({ data: { email: data.email, password: data.password } });
  }
}
