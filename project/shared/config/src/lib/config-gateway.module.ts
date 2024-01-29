import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';

const ENV_GATEWAY_FILE_PATH = 'apps/gateway/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [appConfig],
      envFilePath: ENV_GATEWAY_FILE_PATH,
    }),
  ],
})
export class ConfigGatewayModule {}
