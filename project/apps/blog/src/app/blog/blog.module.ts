import { Module } from '@nestjs/common';
import { LikeModule } from '../like/like.module';
import { PostModule } from '../post/post.module';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [LikeModule, PostModule],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
