import { TextPostEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { BasePostRepository } from './base-post.repository';

@Injectable()
export class TextPostRepository extends BasePostRepository<TextPostEntity> {
  constructor() {
    super();
  }
}
