import { Entity } from '@project/shared/core';
import { FileType, FileVault } from '@project/shared/types';

export class FileVaultEntity implements FileVault, Entity<string> {
  public id?: string;
  public imageUri: string;
  public type: string;

  constructor(file: FileVault) {
    this.id = file.id;
    this.imageUri = file.imageUri;
    this.type = file.type;
  }

  public toPojo() {
    return {
      id: this.id,
      imageUri: this.imageUri,
      type: this.type,
    };
  }

  static fromObject(file: FileVault): FileVaultEntity {
    return new FileVaultEntity(file);
  }
}
