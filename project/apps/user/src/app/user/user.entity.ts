import { AuthUser } from '@project/shared/types';
import { Entity } from '@project/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatar?: string;
  public publicationsCount: number;
  public subscribersCount: number;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatar = user.avatar;
    this.publicationsCount = user.publicationsCount;
    this.subscribersCount = user.subscribersCount;
    this.passwordHash = user.passwordHash;
  }

  toPojo(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  static fromObject(user: AuthUser): UserEntity {
    return new UserEntity(user);
  }
}
