import { Injectable } from '@nestjs/common';
import { createDecoratorProxy } from '@project/shared/core';
import { CommentEntity } from './comment.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentRepository extends createDecoratorProxy<Prisma.CommentDelegate>([
  'create',
  'delete',
  'findFirst',
  'findMany',
  'update',
  'findUnique',
  'count',
]) {
  public async save(comment: CommentEntity) {
    const newComment = await this.create({
      data: comment,
    });
    return CommentEntity.fromObject(newComment);
  }

  public async deleteById(id: string) {
    const deletedComment = await this.delete({
      where: {
        id,
      },
    });
    return CommentEntity.fromObject(deletedComment);
  }

  public async getCommentsByPostId(postId: string, take: number, skip: number) {
    const comments = await this.findMany({
      where: { postId },
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    });
    return comments.map((comment) => CommentEntity.fromObject(comment));
  }
}
