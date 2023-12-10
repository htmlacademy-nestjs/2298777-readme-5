import { Module } from '@nestjs/common';
import { FileVaultController } from './file-vault.controller';
import { FileVaultService } from './file-vault.service';
import { FileVaultRepository } from './file-vault.repository';

@Module({
  imports: [],
  controllers: [FileVaultController],
  providers: [FileVaultService, FileVaultRepository],
})
export class FileVaultModule {}
