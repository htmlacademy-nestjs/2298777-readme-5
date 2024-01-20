import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionUri } from '@project/shared/utils';

export const getNotifyMongooseOptions = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionUri(
          config.get('app.db.username')!,
          config.get('app.db.password')!,
          config.get('app.db.host')!,
          config.get('app.db.port')!,
          config.get('app.db.database')!,
          config.get('app.db.authSource')!
        ),
      };
    },
    inject: [ConfigService],
  };
};
