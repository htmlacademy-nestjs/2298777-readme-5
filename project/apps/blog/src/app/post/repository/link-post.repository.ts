import { LinkPostEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { BasePostRepository } from './base-post.repository';

@Injectable()
export class LinkPostRepository extends BasePostRepository<LinkPostEntity> {
  constructor() {
    super();
  }
}
