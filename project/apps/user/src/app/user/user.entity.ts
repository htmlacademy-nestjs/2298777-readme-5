import { AuthUser } from '@project/shared/types';
import { Entity } from '@project/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';
import { UserModel } from './user.model';

export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatar?: string;
  public publicationsCount: number;
  public subscribersCount: number;
  public passwordHash: string;
  public createdAt?: Date;

  constructor(user: AuthUser) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatar = user.avatar;
    this.publicationsCount = user.publicationsCount;
    this.subscribersCount = user.subscribersCount;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
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
      createdAt: this.createdAt,
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

  static fromObject(user: UserModel): UserEntity {
    return new UserEntity(user);
  }
}
