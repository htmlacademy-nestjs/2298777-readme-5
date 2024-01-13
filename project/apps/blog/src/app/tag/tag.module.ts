import { Module } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/blog/models';
import { TagRepository } from './tag.repository';

@Module({
  exports: [TagRepository],
  providers: [
    {
      provide: TagRepository,
      useFactory: (prisma: PrismaClientService) => new TagRepository(prisma.tagsOnPost),
      inject: [PrismaClientService],
    },
  ],
  imports: [PrismaClientService],
})
export class TagModule {}
