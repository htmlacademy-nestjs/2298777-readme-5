import { Module } from '@nestjs/common';
import { SubscribeRepository } from './subscribe.repository';
import { PrismaClientModule, PrismaClientService } from '@project/shared/blog/models';
import { SubscribeController } from './subcribe.controller';
import { SubscribeService } from './subscribe.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared/config';

@Module({
  imports: [
    PrismaClientModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  providers: [
    {
      provide: SubscribeRepository,
      useFactory: (prisma) => new SubscribeRepository(prisma.subscription),
      inject: [PrismaClientService],
    },
    SubscribeService,
  ],
  controllers: [SubscribeController],
})
export class SubscribeModule {}
