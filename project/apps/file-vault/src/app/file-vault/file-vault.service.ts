import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FileVaultRepository } from './file-vault.repository';
import { CreateFileDto } from './dto/create-file.dto';
import { FileVaultEntity } from './file-vault.entity';
import { FileType } from '@project/shared/types';

@Injectable()
export class FileVaultService {
  constructor(private readonly fileVaultRepository: FileVaultRepository) {}

  public async upload(file: CreateFileDto) {
    if (Object.values(FileType).includes(file.type) === false) {
      throw new BadRequestException('Incorrect file type');
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
