import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [PostModule, LikeModule, BlogModule],
})
export class AppModule {}
