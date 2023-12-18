import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import mongoConfig from './mongo.config';

const ENV_FILE_FILE_PATH = 'apps/file-vault/file.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [appConfig, mongoConfig],
      envFilePath: ENV_FILE_FILE_PATH,
    }),
  ],
})
export class ConfigFileModule {}
