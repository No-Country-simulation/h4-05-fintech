import { Injectable, Inject, BadRequestException, ConflictException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { RegistryDto } from './dto';

import config from '../../config';
import { Environment } from '../../common/enums/environments';
import { MailerService } from 'src/common/modules/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async registry(data: RegistryDto) {
    const userFound = await this.userService.getUser(data.email);

    if (userFound) throw new ConflictException('user already registered');

    const isMatch = data.password === data.confirmPassword;

    if (!isMatch) throw new BadRequestException(`the passwords don't match`);

    const hashed = await bcrypt.hash(data.password, 10);

    if (this.configService.nodeEnv === Environment.PRODUCTION) await this.mailerService.sendMail();
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev();

    await this.userService.createUser({ email: data.email, password: hashed });

    return { message: 'user successfully registered' };
  }
}
