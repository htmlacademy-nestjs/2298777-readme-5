import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getNotifyMongooseOptions, ConfigNotifyModule } from '@project/shared/config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getNotifyMongooseOptions()),
    ConfigNotifyModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
