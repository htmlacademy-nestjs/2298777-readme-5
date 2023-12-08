import { BaseRepository } from '@project/shared/core';
import { Injectable } from '@nestjs/common';
import { VideoPostEntity } from './entities/video-post.entity';
import { TextPostEntity } from './entities/text-post.entity';
import { QuotePostEntity } from './entities/quote-post.entity';
import { ImagePostEntity } from './entities/image-post.entity';
import { LinkPostEntity } from './entities';

@Injectable()
export class PostRepository extends BaseRepository<
  VideoPostEntity | TextPostEntity | QuotePostEntity | ImagePostEntity | LinkPostEntity
> {
  constructor() {
    super();
  }

  public async getPosts() {
    return Array.from(this.entities.values());
  }
}
