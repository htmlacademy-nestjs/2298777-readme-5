import { UserEntity } from './user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  public async save(entity: UserEntity) {
    const user = await new this.userModel(entity).setPassword(entity.password);
    await user.save();
    return user;
  }

  public async updateById(id: string, entity: UserEntity) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, entity).exec();
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid id');
    }
  }

  public async deleteById(id: string) {
    try {
      await this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new BadRequestException('Invalid id');
    }
  }

  public async findById(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid id');
    }
  }

  public async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
}
