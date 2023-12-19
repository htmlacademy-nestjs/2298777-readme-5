import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FileVaultEntity } from './file-vault.entity';
import { FileType } from '@project/shared/types';
import { FileFinderRepository } from '@project/shared/core';
import { FileVaultRepositoryToken } from './file-vault.token';

@Injectable()
export class FileVaultService {
  constructor(
    @Inject(FileVaultRepositoryToken)
    private readonly fileVaultRepository: FileFinderRepository<FileVaultEntity>
  ) {}

  public async upload(file: CreateFileDto) {
    if (Object.values(FileType).includes(file.type) === false) {
      throw new BadRequestException('Incorrect file type');
    }
    const existingFile = await this.fileVaultRepository.findByImageUri(file.imageUri);
    if (existingFile) {
      throw new BadRequestException('File already exists');
    }
    const newFile = new FileVaultEntity(file);
    return await this.fileVaultRepository.save(newFile);
  }

  public async get(id: string) {
    const file = await this.fileVaultRepository.findById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }
}
