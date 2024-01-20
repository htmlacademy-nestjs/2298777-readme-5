import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(private readonly emailSubscriberRepository: EmailSubscriberRepository) {}

  public async createSubscriber(dto: CreateSubscriberDto) {
    const existingSubscriber = await this.emailSubscriberRepository.findByEmail(dto.email);

    if (existingSubscriber) {
      return existingSubscriber;
    }

    return this.emailSubscriberRepository.save(new EmailSubscriberEntity(dto));
  }
}
