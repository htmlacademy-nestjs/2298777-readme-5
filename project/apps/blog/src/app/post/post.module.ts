import { Module } from '@nestjs/common';
import { PostRepositoryService } from './post.repository.service';
import {
  ImagePostRepository,
  LinkPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
} from './repository';

@Module({
  exports: [PostRepositoryService],
  providers: [
    PostRepositoryService,
    ImagePostRepository,
    LinkPostRepository,
    VideoPostRepository,
    QuotePostRepository,
    TextPostRepository,
  ],
})
export class PostModule {}
