import { Entity } from '@project/shared/core';
import { Comment } from '@project/shared/types';

export class CommentEntity implements Comment, Entity<string> {
  public id?: string;
  public postId: string;
  public authorId: string;
  public text: string;
  public createdAt: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.postId = comment.postId;
    this.authorId = comment.authorId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
  }

  public toPojo() {
    return {
      id: this.id,
      postId: this.postId,
      authorId: this.authorId,
      text: this.text,
      createdAt: this.createdAt,
    };
  }

  public static fromObject(comment: Comment) {
    return new CommentEntity(comment);
  }
}
