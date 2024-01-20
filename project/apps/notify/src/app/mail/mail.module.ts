import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfigOptions } from '@project/shared/config';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(getMailConfigOptions('app.mail'))],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
