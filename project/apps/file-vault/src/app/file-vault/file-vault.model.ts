import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileType, FileVault } from '@project/shared/types';
import { Document } from 'mongoose';

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class FileVaultModel extends Document implements FileVault {
  @Prop({
    required: true,
  })
  public originalName: string;

  @Prop({
    required: true,
  })
  public hashName: string;

  @Prop({
    required: true,
  })
  public mimetype: string;

  @Prop({
    required: true,
  })
  public size: number;

  @Prop({
    required: true,
  })
  public path: string;

  @Prop({
    required: true,
  })
  public directory: string;

  public id?: string;
}

export const FileVaultSchema = SchemaFactory.createForClass(FileVaultModel);

FileVaultSchema.virtual('id').get(function () {
  return this._id.toString();
});
