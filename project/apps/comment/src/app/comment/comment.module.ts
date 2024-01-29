import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PrismaClientService, PrismaClientModule } from '@project/shared/blog/models';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared/config';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: CommentRepository,
      useFactory: (prisma: PrismaClientService) => new CommentRepository(prisma.comment),
      inject: [PrismaClientService],
    },
  ],
  imports: [
    PrismaClientModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
})
export class CommentModule {}
