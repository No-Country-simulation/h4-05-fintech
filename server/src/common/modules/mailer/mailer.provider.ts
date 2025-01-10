import { FactoryProvider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import sendgrid from '@sendgrid/mail';
import { createTransport } from 'nodemailer';

import config from '../../../config';
import { Environment } from '../../enums/environments';

export const MAILER = 'MAILER';

export const MailerProvider: FactoryProvider = {
  provide: MAILER,
  inject: [config.KEY],
  useFactory: (configService: ConfigType<typeof config>) => {
    return configService.nodeEnv === Environment.PRODUCTION
      ? sendgrid.setApiKey(configService.sendGridApiKey)
      : createTransport({
          host: configService.mailTrap.host,
          auth: {
            user: configService.mailTrap.username,
            pass: configService.mailTrap.password,
          },
        });
  },
};
