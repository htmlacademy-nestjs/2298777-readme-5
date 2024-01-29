import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting, User } from '@project/shared/types';
import { MailService } from '../mail/mail.service';

@Controller('notify')
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

  @Post('activate')
  public async activateNotifications(@Body() body: { email: string }) {
    this.emailSubscriberService.activateNotifications(body.email);
  }

  @Delete('deactivate')
  public async deactivateNotifications(@Body() body: { email: string }) {
    this.emailSubscriberService.deactivateNotifications(body.email);
  }

  @Post('post')
  public async sendNotifyAboutPost(@Body() body: { email: string; authorEmail: string }) {
    this.emailSubscriberService.sendNotifyAboutPost(body.email, body.authorEmail);
  }

  @Get('check/:email')
  public async checkActivationStatus(@Param('email') email: string) {
    const status = await this.emailSubscriberService.checkActivationStatus(email);

    return { status };
  }
}
