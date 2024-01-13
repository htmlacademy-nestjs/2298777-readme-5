import { Module } from '@nestjs/common';
import { FileVaultModule } from './file-vault/file-vault.module';
import { ConfigFileModule, getFileMongooseOptions } from '@project/shared/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileVaultModule,
    ConfigFileModule,
    MongooseModule.forRootAsync(getFileMongooseOptions()),
  ],
})
export class AppModule {}
