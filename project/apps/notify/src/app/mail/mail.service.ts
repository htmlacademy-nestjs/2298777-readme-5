import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@project/shared/config';
import { ResultingPost, Subscriber, User } from '@project/shared/types';

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

  public async sendNotifyToEmailAboutPost(subscriber: Subscriber, email: string) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: 'Новый пост',
      template: './new-post',
      context: {
        user: email,
      },
    });
  }
}
