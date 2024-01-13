import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository, EmailFinderRepository } from '@project/shared/core';

@Injectable()
export class UserRepository
  extends BaseMongoRepository<UserEntity, UserModel>
  implements EmailFinderRepository<UserEntity>
{
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
    super(userModel, UserEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();
    const entity = this.createEntityFromDocument(user);
    return entity;
  }
}
