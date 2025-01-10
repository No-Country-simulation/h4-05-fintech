import { Inject, Injectable } from '@nestjs/common';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { Transporter } from 'nodemailer';
import { MAILER } from './mailer.provider';

@Injectable()
export class MailerService {
  constructor(
    @Inject(MAILER) private readonly sendGrid: MailService,
    @Inject(MAILER) private readonly mailTrap: Transporter,
  ) {}

  async sendMail() {
    const mail: MailDataRequired = {
      to: '',
      from: '',
      subject: '',
      text: '',
      html: '',
    };

    await this.sendGrid.send(mail);
  }

  async sendMailDev() {
    await this.mailTrap.sendMail({
      from: '',
      to: '',
      subject: '',
      html: '',
    });
  }
}
