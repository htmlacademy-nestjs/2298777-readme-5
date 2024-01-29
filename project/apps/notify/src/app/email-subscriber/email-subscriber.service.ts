import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailService } from '../mail/mail.service';
import { User } from '@project/shared/types';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService
  ) {}

  public async createSubscriber(dto: CreateSubscriberDto) {
    const existingSubscriber = await this.emailSubscriberRepository.findByEmail(dto.email);

    if (existingSubscriber) {
      return existingSubscriber;
    }

    return this.emailSubscriberRepository.save(new EmailSubscriberEntity(dto));
  }

  public async activateNotifications(email: string) {
    const subscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (!subscriber) {
      throw new BadRequestException('Subscriber not found');
    }

    subscriber.isActive = true;

    await this.emailSubscriberRepository.updateById(subscriber.id, subscriber);
  }

  public async deactivateNotifications(email: string) {
    const subscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (!subscriber) {
      throw new BadRequestException('Subscriber not found');
    }

    subscriber.isActive = false;

    await this.emailSubscriberRepository.updateById(subscriber.id, subscriber);
  }

  public async checkActivationStatus(email: string) {
    const subscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (!subscriber) {
      throw new BadRequestException('Subscriber not found');
    }

    return subscriber.isActive;
  }

  public async sendNotifyAboutPost(email: string, authorEmail: string) {
    const subscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (!subscriber) {
      throw new BadRequestException('Subscriber not found');
    }

    if (!subscriber.isActive) {
      return;
    }

    this.mailService.sendNotifyToEmailAboutPost(subscriber, authorEmail);
  }
}
