import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUserModule, getNotifyMongooseOptions } from '@project/shared/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(getNotifyMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
