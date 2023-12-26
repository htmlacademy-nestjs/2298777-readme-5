import { Module } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { PrismaClientModule, PrismaClientService } from '@project/shared/blog/models';

@Module({
  exports: [LikeRepository],
  providers: [
    {
      provide: LikeRepository,
      useFactory: (prisma: PrismaClientService) => new LikeRepository(prisma.like),
      inject: [PrismaClientService],
    },
  ],
  imports: [PrismaClientModule],
})
export class LikeModule {}
