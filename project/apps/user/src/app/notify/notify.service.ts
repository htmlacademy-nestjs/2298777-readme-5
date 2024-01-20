import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { userConfig } from '@project/shared/config';
import { RabbitRouting } from '@project/shared/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(userConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof userConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.rabbit.exchange,
      RabbitRouting.AddSubscription,
      {
        ...dto,
      }
    );
  }
}
