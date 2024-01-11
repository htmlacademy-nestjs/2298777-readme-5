import { Module } from '@nestjs/common';
import { PostRepositoryService } from './post.repository.service';
import {
  ImagePostRepository,
  LinkPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
} from './repository';
import { PostRepository } from './repository/post.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Module({
  exports: [PostRepositoryService],
  providers: [
    PostRepositoryService,
    {
      provide: PostRepository,
      useFactory: () => new PostRepository(prisma.post),
    },
    {
      provide: ImagePostRepository,
      useFactory: () => new ImagePostRepository(prisma.imagePost),
    },
    {
      provide: LinkPostRepository,
      useFactory: () => new LinkPostRepository(prisma.linkPost),
    },
    {
      provide: VideoPostRepository,
      useFactory: () => new VideoPostRepository(prisma.videoPost),
    },
    {
      provide: QuotePostRepository,
      useFactory: () => new QuotePostRepository(prisma.quotePost),
    },
    {
      provide: TextPostRepository,
      useFactory: () => new TextPostRepository(prisma.textPost),
    },
  ],
})
export class PostModule {}
