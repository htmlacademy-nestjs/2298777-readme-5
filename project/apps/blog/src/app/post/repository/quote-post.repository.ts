import { BaseRepository } from '@project/shared/core';
import { QuotePostEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { BasePostRepository } from './base-post.repository';

@Injectable()
export class QuotePostRepository extends BasePostRepository<QuotePostEntity> {
  constructor() {
    super();
  }
}
