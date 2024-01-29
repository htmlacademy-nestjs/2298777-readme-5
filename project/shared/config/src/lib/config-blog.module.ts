import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';
import rabbitConfig from './rabbitmq/rabbit.config';

const ENV_BLOG_FILE_PATH = 'apps/blog/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [appConfig, rabbitConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
  ],
})
export class ConfigBlogModule {}
