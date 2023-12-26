import { Entity } from '@project/shared/core';
import { Like } from '@project/shared/types';

export class LikeEntity implements Entity<string> {
  public id?: string;
  public postId: string;
  public userId: string;

  constructor(like: Like) {
    this.id = like.id;
    this.postId = like.postId;
    this.userId = like.userId;
  }

  public toPojo() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
    };
  }

  static fromObject(like: Like) {
    return new LikeEntity(like);
  }
}
