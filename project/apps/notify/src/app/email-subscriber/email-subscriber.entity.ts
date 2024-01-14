import { Subscriber } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export class EmailSubscriberEntity implements Subscriber, Entity<string> {
  public id?: string;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(subscriber: Subscriber) {
    this.id = subscriber.id;
    this.email = subscriber.email;
    this.firstName = subscriber.firstName;
    this.lastName = subscriber.lastName;
  }

  public toPojo() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  static fromObject(subscriber: Subscriber) {
    return new EmailSubscriberEntity(subscriber);
  }
}
