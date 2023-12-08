import { Post, PostStatus } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export abstract class BasePostEntity implements Post, Entity<string> {
  public id?: string;
  public tags?: string[];
  public authorId: string;
  public createDate: Date;
  public publishDate?: Date;
  public status: PostStatus;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public likesCount: number;
  public commentsCount: number;

  constructor(post: Post) {
    this.id = post.id;
    this.tags = post.tags;
    this.authorId = post.authorId;
    this.createDate = post.createDate;
    this.publishDate = post.publishDate;
    this.status = post.status;
    this.originalAuthorId = post.originalAuthorId;
    this.originalPostId = post.originalPostId;
    this.likesCount = post.likesCount;
    this.commentsCount = post.commentsCount;
  }

  public toPojo() {
    return {
      id: this.id,
      tags: this.tags,
      authorId: this.authorId,
      createDate: this.createDate,
      publishDate: this.publishDate,
      status: this.status,
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
    };
  }

  public setLikesCount(count: number) {
    this.likesCount = count;
  }

  public setCommentsCount(count: number) {
    this.commentsCount = count;
  }
}
