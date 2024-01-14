import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionUri } from '@project/shared/utils';

export const getMongooseOptions = (config: ConfigService): MongooseModuleAsyncOptions => ({
  useFactory: async (config: ConfigService) => ({
    uri: getMongoConnectionUri(
      config.get<string>('app.db.user')!,
      config.get<string>('app.db.password')!,
      config.get<string>('app.db.host')!,
      config.get<number>('app.db.port')!,
      config.get<string>('app.db.database')!,
      config.get<string>('app.db.authSource')!
    ),
  }),
  inject: [ConfigService],
});
