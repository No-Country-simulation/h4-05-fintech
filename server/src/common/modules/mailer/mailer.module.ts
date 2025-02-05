import { Global, Module } from '@nestjs/common';
import { MailerProvider } from './mailer.provider';
import { MailerService } from './mailer.service';

@Global()
@Module({
  providers: [MailerProvider, MailerService],
  exports: [MailerService],
})
export class MailerModule {}
