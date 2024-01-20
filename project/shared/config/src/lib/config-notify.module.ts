import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notifyConfig from './notify/notify.config';

const ENV_NOTIFY_FILE_PATH = 'apps/notify/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [notifyConfig],
      envFilePath: ENV_NOTIFY_FILE_PATH,
    }),
  ],
})
export class ConfigNotifyModule {}
