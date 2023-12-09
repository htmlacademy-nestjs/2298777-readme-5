import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@project/shared/core';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository extends BaseRepository<CommentEntity> {
  constructor() {
    super();
  }

  public async getCommentsByPostId(postId: string) {
    return Array.from(this.entities.values()).filter((comment) => comment.postId === postId);
  }
}
