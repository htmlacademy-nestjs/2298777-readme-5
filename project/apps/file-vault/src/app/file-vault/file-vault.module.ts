import { Module } from '@nestjs/common';
import { FileVaultController } from './file-vault.controller';
import { FileVaultService } from './file-vault.service';
import { FileVaultRepository } from './file-vault.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FileVaultModel, FileVaultSchema } from './file-vault.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: FileVaultModel.name, schema: FileVaultSchema }])],
  controllers: [FileVaultController],
  providers: [FileVaultService, FileVaultRepository],
})
export class FileVaultModule {}
