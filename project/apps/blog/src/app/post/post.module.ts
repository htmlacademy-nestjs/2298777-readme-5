import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Module({
  exports: [PostRepository],
  providers: [PostRepository],
})
export class PostModule {}
