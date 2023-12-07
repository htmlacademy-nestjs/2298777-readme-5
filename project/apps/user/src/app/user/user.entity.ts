import { AuthUser } from '@project/shared/types';
import { Entity } from '@project/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public avatar?: string;
  public registerDate: Date;
  public publicationsCount: number;
  public subscribersCount: number;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar;
    this.registerDate = user.registerDate;
    this.publicationsCount = user.publicationsCount;
    this.subscribersCount = user.subscribersCount;
    this.passwordHash = user.passwordHash;
  }

  public toPojo() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      registerDate: this.registerDate,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.name = data.name;
    this.avatar = data.avatar;
    this.registerDate = data.registerDate;
    this.publicationsCount = data.publicationsCount;
    this.subscribersCount = data.subscribersCount;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
