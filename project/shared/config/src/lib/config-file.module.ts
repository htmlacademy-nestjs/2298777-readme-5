import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fileUploaderConfig from './file/file-uploader.config';

const ENV_FILE_FILE_PATH = 'apps/file-vault/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [fileUploaderConfig],
      envFilePath: ENV_FILE_FILE_PATH,
    }),
  ],
})
export class ConfigFileModule {}
