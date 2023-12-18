import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionUri } from '@project/shared/utils';

export const getMongooseOptions = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (config: ConfigService) => {
      console.log(
        getMongoConnectionUri(
          config.get('mongo.user')!,
          config.get('mongo.password')!,
          config.get('mongo.host')!,
          config.get('mongo.port')!,
          config.get('mongo.name')!,
          config.get('mongo.authBase')!
        )
      );
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
