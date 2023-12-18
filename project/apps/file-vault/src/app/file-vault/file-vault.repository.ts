import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileVaultModel } from './file-vault.model';
import { FileVaultEntity } from './file-vault.entity';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@project/shared/core';

@Injectable()
export class FileVaultRepository extends BaseMongoRepository<FileVaultEntity, FileVaultModel> {
  constructor(
    @InjectModel(FileVaultModel.name) private readonly fileVaultModel: Model<FileVaultModel>
  ) {
    super(fileVaultModel, FileVaultEntity.fromObject);
  }

  public async findByImageUri(imageUri: string) {
    return await this.fileVaultModel.findOne({ imageUri }).exec();
  }
}
