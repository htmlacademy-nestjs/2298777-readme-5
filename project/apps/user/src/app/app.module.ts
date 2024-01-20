import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUserModule, getUserMongooseOptions } from '@project/shared/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(getUserMongooseOptions()),
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
