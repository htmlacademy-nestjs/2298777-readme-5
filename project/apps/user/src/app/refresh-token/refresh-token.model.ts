import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TokenWithId } from '@project/shared/types';

@Schema({
  collection: 'refresh-tokens',
  timestamps: true,
})
export class RefreshTokenModel extends Document implements TokenWithId {
  @Prop()
  public createdAt: Date;

  @Prop({ required: true })
  public expiresAt: Date;

  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public tokenId: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);
