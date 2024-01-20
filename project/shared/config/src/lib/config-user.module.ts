import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './jwt/jwt.config';
import userConfig from './user/user.config';

const ENV_USER_FILE_PATH = 'apps/user/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [userConfig, jwtConfig],
      envFilePath: ENV_USER_FILE_PATH,
    }),
  ],
})
export class ConfigUserModule {}
