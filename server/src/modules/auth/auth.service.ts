import crypto from 'node:crypto';

import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { MailerService } from '../../common/modules/mailer/mailer.service';

import { EmailData } from '../../common/modules/mailer/mailer.interface';
import { RegistryDto } from './dto';

import config from '../../config';
import { Environment } from '../../common/enums';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async registry(data: RegistryDto) {
    const userFound = await this.userService.getUser({ email: data.email });

    if (userFound) throw new ConflictException('user already registered');

    const isMatch = data.password === data.confirmPassword;

    if (!isMatch) throw new BadRequestException(`the passwords don't match`);

    const hashed = await bcrypt.hash(data.password, 10);
    const code = crypto.randomBytes(32).toString('hex');

    const emailData: EmailData = {
      email: data.email,
      subject: 'Bienvenido a iUPI',
      template: 'welcome.hbs',
      variables: {
        link: `${this.configService.frontendUrl}/verify/${code}`,
      },
    };

    if (this.configService.nodeEnv === Environment.PRODUCTION)
      await this.mailerService.sendMail(emailData);
    else if (this.configService.nodeEnv === Environment.DEVELOPMENT)
      await this.mailerService.sendMailDev(emailData);

    await this.userService.createUser({ email: data.email, password: hashed, code });

    return { message: 'user successfully registered' };
  }

  async verify(code: string) {
    const userFound = await this.userService.getUser({ code });
    if (!userFound) throw new NotFoundException('user not found');

    userFound.verified = true;
    userFound.code = null;
    userFound.expiration = null;

    await this.userService.updateUser(userFound);

    return { message: 'user successfully verified' };
  }
}
