import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@project/shared/core';
import { FileVaultEntity } from './file-vault.entity';

@Injectable()
export class FileVaultRepository extends BaseRepository<FileVaultEntity> {
  constructor() {
    super();
  }
}
