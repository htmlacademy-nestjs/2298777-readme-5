import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ensureDir } from 'fs-extra';
import { ConfigType } from '@nestjs/config';
import { writeFile } from 'fs/promises';
import { FileUploaderConfig } from '@project/shared/config';
import { join } from 'node:path';
import 'multer';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import { FileVaultRepository } from './file-vault.repository';
import { FileVaultEntity } from './file-vault.entity';
import { fileRepositoryToken } from './file-repo.token';

@Injectable()
export class FileVaultService {
  private readonly logger = new Logger(FileVaultService.name);

  constructor(
    @Inject(fileRepositoryToken)
    private readonly fileVaultRepository: FileVaultRepository,
    @Inject(FileUploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof FileUploaderConfig>
  ) {}

  private getUploadDirectoryPath() {
    return this.applicationConfig.uploaderDir;
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  public async upload(file: Express.Multer.File) {
    try {
      const uploadDir = this.getUploadDirectoryPath();
      const directory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const fileName = `${randomUUID()}.${fileExtension}`;

      const path = this.getDestinationFilePath(fileName);

      await ensureDir(join(uploadDir, directory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        fileName,
        path,
        directory,
      };
    } catch (error) {
      this.logger.error(`Error while uploading file: ${(error as Error).message}`);
      throw new Error('Error while uploading file');
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileVaultEntity> {
    const storedFile = await this.upload(file);
    const fileVaultEntity = new FileVaultEntity({
      originalName: file.originalname,
      hashName: storedFile.fileName,
      mimetype: file.mimetype,
      size: file.size,
      path: storedFile.path,
      directory: storedFile.directory,
    });

    return this.fileVaultRepository.save(fileVaultEntity);
  }

  public async get(id: string) {
    const file = await this.fileVaultRepository.findById(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }
}
