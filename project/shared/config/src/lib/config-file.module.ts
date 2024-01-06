import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoConfig from './mongo.config';
import fileUploaderConfig from './file-uploader.config';

const ENV_FILE_FILE_PATH = 'apps/file-vault/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [fileUploaderConfig, mongoConfig],
      envFilePath: ENV_FILE_FILE_PATH,
    }),
  ],
})
export class ConfigFileModule {}
