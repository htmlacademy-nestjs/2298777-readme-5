import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';

const ENV_BLOG_FILE_PATH = 'apps/blog/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [appConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
  ],
})
export class ConfigBlogModule {}
