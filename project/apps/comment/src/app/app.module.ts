import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PrismaClientModule } from '@project/shared/blog/models';
import { ConfigCommentModule } from '@project/shared/config';
@Module({
  imports: [CommentModule, PrismaClientModule, ConfigCommentModule],
})
export class AppModule {}
