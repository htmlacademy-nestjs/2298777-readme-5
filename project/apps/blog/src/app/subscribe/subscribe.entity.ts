import { Entity } from '@project/shared/core';
import { Subscribe } from '@project/shared/types';

export class SubscribeEntity implements Entity<string> {
  public id?: string;
  public userId: string;
  public authorId: string;

  constructor(subscribe: Subscribe) {
    this.id = subscribe.id;
    this.userId = subscribe.userId;
    this.authorId = subscribe.authorId;
  }

  public toPojo() {
    return {
      id: this.id,
      userId: this.userId,
      authorId: this.authorId,
    };
  }

  static fromObject(subscribe: Subscribe) {
    return new SubscribeEntity(subscribe);
  }
}
