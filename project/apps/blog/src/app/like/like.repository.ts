import { ConflictException, Injectable } from '@nestjs/common';
import { BaseRepository } from '@project/shared/core';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository extends BaseRepository<LikeEntity> {
  constructor() {
    super();
  }

  public async find(postId: string, userId: string) {
    const like = Array.from(this.entities.values()).find(
      (like) => like.postId === postId && like.userId === userId
    );
    return like ?? null;
  }

  public async likePost(postId: string, userId: string) {
    if (await this.find(postId, userId)) {
      throw new ConflictException('You already liked this post');
    }
    const like = new LikeEntity({ postId, userId });
    return this.save(like);
  }

  public async unlikePost(postId: string, userId: string) {
    const like = await this.find(postId, userId);
    if (!like) {
      throw new ConflictException('You have not liked this post');
    }
    return this.deleteById(like.id);
  }

  public async countLikes(postId: string) {
    return Array.from(this.entities.values()).filter((like) => like.postId === postId).length;
  }
}
