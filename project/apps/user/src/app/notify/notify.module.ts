import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { getRabbitMQOptions } from '@project/shared/config';
import { NotifyService } from './notify.service';

@Module({
  imports: [RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('app.rabbit'))],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
