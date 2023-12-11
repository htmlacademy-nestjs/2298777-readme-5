import { ImagePostEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { BasePostRepository } from './base-post.repository';

@Injectable()
export class ImagePostRepository extends BasePostRepository<ImagePostEntity> {
  constructor() {
    super();
  }
}
