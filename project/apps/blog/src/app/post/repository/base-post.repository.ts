import { BaseRepository, Entity } from '@project/shared/core';
import { PostEntity } from '../../blog/blog.types';

export abstract class BasePostRepository<T extends PostEntity> extends BaseRepository<T> {
  constructor() {
    super();
  }

  public async getPosts() {
    return await Array.from(this.entities.values());
  }
}
