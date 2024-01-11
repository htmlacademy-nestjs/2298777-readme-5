import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { BlogModule } from './blog/blog.module';
import { PrismaClientModule } from '@project/shared/blog/models';

@Module({
  imports: [PostModule, LikeModule, BlogModule, PrismaClientModule],
})
export class AppModule {}
