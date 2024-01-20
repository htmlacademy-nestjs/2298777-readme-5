import { Controller } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/types';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscription,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.emailSubscriberService.createSubscriber(subscriber);
    this.mailService.sendNotifyToEmail(subscriber);
  }
}
