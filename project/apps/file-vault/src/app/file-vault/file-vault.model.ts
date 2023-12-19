import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileType } from '@project/shared/types';
import { Document } from 'mongoose';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class FileVaultModel extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  public imageUri: string;

  @Prop({
    required: true,
    enum: FileType,
  })
  public type: string;
}

export const FileVaultSchema = SchemaFactory.createForClass(FileVaultModel);
