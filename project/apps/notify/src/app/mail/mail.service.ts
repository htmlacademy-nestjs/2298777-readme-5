import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@project/shared/config';
import { Subscriber } from '@project/shared/types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>
  ) {}

  public async sendNotifyToEmail(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: 'Подписка оформлена',
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: subscriber.email,
      },
    });
  }
}
