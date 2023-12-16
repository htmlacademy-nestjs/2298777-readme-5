import { AuthUser } from '@project/shared/types';
import { Entity } from '@project/shared/core';

export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatar?: string;
  public publicationsCount: number;
  public subscribersCount: number;
  public password: string;

  constructor(user: AuthUser) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatar = user.avatar;
    this.publicationsCount = user.publicationsCount;
    this.subscribersCount = user.subscribersCount;
    this.password = user.password;
  }
}
