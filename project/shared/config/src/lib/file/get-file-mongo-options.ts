import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionUri } from '@project/shared/utils';

export function getFileMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionUri(
          config.get<string>('app.db.user')!,
          config.get<string>('app.db.password')!,
          config.get<string>('app.db.host')!,
          config.get<number>('app.db.port')!,
          config.get<string>('app.db.name')!,
          config.get<string>('app.db.authBase')!
        ),
      };
    },
    inject: [ConfigService],
  };
}
