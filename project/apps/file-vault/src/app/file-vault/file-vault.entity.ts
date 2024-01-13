import { Entity } from '@project/shared/core';
import { FileVault } from '@project/shared/types';

export class FileVaultEntity implements FileVault, Entity<string> {
  public id?: string;
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public directory: string;

  constructor(data: FileVault) {
    this.id = data.id ?? undefined;
    this.originalName = data.originalName;
    this.size = data.size;
    this.mimetype = data.mimetype;
    this.hashName = data.hashName;
    this.directory = data.directory;
    this.path = data.path;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  public toPojo() {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      directory: this.directory,
    };
  }

  static fromObject(file: FileVault): FileVaultEntity {
    return new FileVaultEntity(file);
  }
}
