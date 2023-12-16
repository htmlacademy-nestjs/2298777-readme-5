import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
