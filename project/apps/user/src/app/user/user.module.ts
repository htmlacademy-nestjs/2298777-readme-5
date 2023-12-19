import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryToken } from './user.token';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
  ],
  exports: [UserRepositoryToken],
})
export class UserModule {}
