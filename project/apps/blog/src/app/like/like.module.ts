import { Module } from '@nestjs/common';
import { LikeRepository } from './like.repository';

@Module({
  exports: [LikeRepository],
  providers: [LikeRepository],
})
export class LikeModule {}
