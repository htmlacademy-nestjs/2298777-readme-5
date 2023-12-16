import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/shared/types';
import { compare, genSalt, hash } from 'bcrypt';
import { Document } from 'mongoose';
import { SALT_ROUNDS } from './user.constant';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstName: string;

  @Prop({
    required: true,
  })
  public lastName: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public publicationsCount: number;

  @Prop({
    required: true,
  })
  public subscribersCount: number;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  public setPassword: Function;

  public comparePassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.methods.setPassword = async function (password: string) {
  const salt = await genSalt(SALT_ROUNDS);
  this.passwordHash = await hash(password, salt);
  return this;
};

UserSchema.methods.comparePassword = async function (password: string) {
  return compare(password, this.passwordHash);
};
