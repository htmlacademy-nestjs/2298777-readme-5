import { BaseRepository } from '@project/shared/core';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super();
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = Array.from(this.entities.values()).find((user) => user.email === email);
    return Promise.resolve(user ?? null);
  }
}
