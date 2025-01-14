import { join } from 'node:path';
import { readFileSync } from 'node:fs';

import { Inject, Injectable } from '@nestjs/common';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { Transporter } from 'nodemailer';
import hbs from 'handlebars';

import { MAILER } from './mailer.provider';
import { EmailData } from './mailer.interface';

@Injectable()
export class MailerService {
  constructor(
    @Inject(MAILER) private readonly sendGrid: MailService,
    @Inject(MAILER) private readonly mailTrap: Transporter,
  ) {}

  private compileTemplate(filename: string, variables: { [key: string]: unknown }) {
    const logoPath = join(process.cwd(), 'assets', 'svg', 'logo.svg');
    const templatePath = join(process.cwd(), 'assets', 'templates', filename);
    const stylePath = join(process.cwd(), 'assets', 'styles', 'styles.css');
    const logo = readFileSync(logoPath, 'utf-8');
    const templateSource = readFileSync(templatePath, 'utf-8');
    const style = readFileSync(stylePath, 'utf-8');
    const template = hbs.compile(templateSource);
    return template({ style, logo, ...variables });
  }

  async sendMail(data: EmailData) {
    const { email, subject, template, variables } = data;
    const mail: MailDataRequired = {
      to: email,
      from: '',
      subject,
      html: this.compileTemplate(template, variables),
    };

    await this.sendGrid.send(mail);
  }

  async sendMailDev(data: EmailData) {
    const { email, subject, template, variables } = data;
    await this.mailTrap.sendMail({
      from: '',
      to: email,
      subject,
      html: this.compileTemplate(template, variables),
    });
  }
}
