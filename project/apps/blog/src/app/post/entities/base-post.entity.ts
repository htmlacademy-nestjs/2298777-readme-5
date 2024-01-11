import { Post, PostStatus, PostType } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export class BasePostEntity implements Post, Entity<string> {
  public id?: string;
  public tags?: string[];
  public authorId: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public publishDate?: Date;
  public status: PostStatus;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public likesCount: number;
  public commentsCount: number;
  public type: PostType;

  constructor(post: Post) {
    this.id = post.id;
    this.tags = post.tags;
    this.authorId = post.authorId;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.publishDate = post.publishDate;
    this.status = post.status;
    this.originalAuthorId = post.originalAuthorId;
    this.originalPostId = post.originalPostId;
    this.likesCount = post.likesCount;
    this.commentsCount = post.commentsCount;
    this.type = post.type;
  }

  public toPojo() {
    return {
      id: this.id,
      tags: this.tags,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishDate: this.publishDate,
      status: this.status,
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      type: this.type,
    };
  }

  static fromObject(post: Post) {
    return new BasePostEntity(post);
  }
}
