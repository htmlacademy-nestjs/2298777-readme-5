import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscribeRepository } from './subscribe.repository';
import { RabbitRouting } from '@project/shared/types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class SubscribeService {
  constructor(
    private readonly subscribeRepository: SubscribeRepository,
    private readonly rabbitClient: AmqpConnection
  ) {}

  public async createSubscription(authorId: string, userId: string) {
    const createdSubscription = await this.subscribeRepository.createSubscription(authorId, userId);

    if (!createdSubscription) {
      throw new BadRequestException('Subscription already exists');
    }

    await this.rabbitClient.publish('readme.user.income', RabbitRouting.Subscribe, {
      authorId,
      userId,
      method: 'create',
    });

    return createdSubscription;
  }

  public async deleteSubscription(authorId: string, userId: string) {
    const deletedSubscription = await this.subscribeRepository.deleteSubscription(authorId, userId);

    if (!deletedSubscription) {
      throw new BadRequestException('Subscription not found');
    }

    await this.rabbitClient.publish('readme.user.income', RabbitRouting.Subscribe, {
      authorId,
      userId,
      method: 'delete',
    });

    return deletedSubscription;
  }

  public async countSubscribers(authorId: string) {
    return await this.subscribeRepository.countSubscribers(authorId);
  }

  public async findSubscribers(authorId: string) {
    return await this.subscribeRepository.findSubscribers(authorId);
  }

  public async findSubscribedAuthors(userId: string) {
    return await this.subscribeRepository.findSubscribedAuthors(userId);
  }
}
