import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { BlogModule } from './blog/blog.module';
import { PrismaClientModule } from '@project/shared/blog/models';
import { ConfigBlogModule } from '@project/shared/config';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PostModule, LikeModule, BlogModule, PrismaClientModule, ConfigBlogModule, TagModule],
})
export class AppModule {}
