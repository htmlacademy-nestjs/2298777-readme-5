import { Module } from '@nestjs/common';
import { LikeModule } from '../like/like.module';
import { PostModule } from '../post/post.module';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared/config';

@Module({
  imports: [
    LikeModule,
    PostModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
