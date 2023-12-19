import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
