import { Module } from '@nestjs/common';
import { FileVaultModule } from './file-vault/file-vault.module';

@Module({
  imports: [FileVaultModule],
})
export class AppModule {}
