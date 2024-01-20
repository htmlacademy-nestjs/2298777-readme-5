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
import { PrismaClientModule, PrismaClientService } from '@project/shared/blog/models';
import { TagModule } from '../tag/tag.module';
@Module({
  exports: [PostRepositoryService],
  providers: [
    PostRepositoryService,
    {
      provide: PostRepository,
      useFactory: (prisma: PrismaClientService) => new PostRepository(prisma.post),
      inject: [PrismaClientService],
    },
    {
      provide: ImagePostRepository,
      useFactory: (prisma: PrismaClientService) => new ImagePostRepository(prisma.imagePost),
      inject: [PrismaClientService],
    },
    {
      provide: LinkPostRepository,
      useFactory: (prisma: PrismaClientService) => new LinkPostRepository(prisma.linkPost),
      inject: [PrismaClientService],
    },
    {
      provide: VideoPostRepository,
      useFactory: (prisma: PrismaClientService) => new VideoPostRepository(prisma.videoPost),
      inject: [PrismaClientService],
    },
    {
      provide: QuotePostRepository,
      useFactory: (prisma: PrismaClientService) => new QuotePostRepository(prisma.quotePost),
      inject: [PrismaClientService],
    },
    {
      provide: TextPostRepository,
      useFactory: (prisma: PrismaClientService) => new TextPostRepository(prisma.textPost),
      inject: [PrismaClientService],
    },
  ],
  imports: [PrismaClientModule, TagModule],
})
export class PostModule {}
