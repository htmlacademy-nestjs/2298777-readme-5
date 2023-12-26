import { Injectable } from '@nestjs/common';
import { createDecoratorProxy } from '@project/shared/core';
import { LikeEntity } from './like.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikeRepository extends createDecoratorProxy<Prisma.LikeDelegate>([
  'create',
  'delete',
  'findFirst',
  'findMany',
  'update',
  'findUnique',
  'count',
]) {
  public async findLike(like: LikeEntity) {
    const foundLike = await this.findFirst({
      where: {
        postId: like.postId,
        userId: like.userId,
      },
    });

    if (!foundLike) {
      return null;
    }

    return LikeEntity.fromObject(foundLike);
  }

  public async createLike(like: LikeEntity) {
    const newLike = await this.create({
      data: {
        post: {
          connect: {
            id: like.postId,
          },
        },
        userId: like.userId,
      },
    });
    return LikeEntity.fromObject(newLike);
  }

  public async deleteLike(like: LikeEntity) {
    const foundLike = await this.findLike(like);
    if (!foundLike) {
      return null;
    }
    const deletedLike = await this.delete({
      where: {
        id: foundLike.id,
      },
    });
    return LikeEntity.fromObject(deletedLike);
  }

  public async countLikes(postId: string) {
    return await this.count({
      where: {
        postId,
      },
    });
  }
}
