import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionUri } from '@project/shared/utils';

export const getNotifyMongooseOptions = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionUri(
          config.get('mongo.user')!,
          config.get('mongo.password')!,
          config.get('mongo.host')!,
          config.get('mongo.port')!,
          config.get('mongo.name')!,
          config.get('mongo.authBase')!
        ),
      };
    },
    inject: [ConfigService],
  };
};
