import { VideoPostEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { BasePostRepository } from './base-post.repository';

@Injectable()
export class VideoPostRepository extends BasePostRepository<VideoPostEntity> {
  constructor() {
    super();
  }
}
