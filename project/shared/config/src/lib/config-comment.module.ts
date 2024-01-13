import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';

const ENV_COMMENT_FILE_PATH = 'apps/comment/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [appConfig],
      envFilePath: ENV_COMMENT_FILE_PATH,
    }),
  ],
})
export class ConfigCommentModule {}
