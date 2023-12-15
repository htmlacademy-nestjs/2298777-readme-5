import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUserModule } from '@project/shared/config';

@Module({
  imports: [AuthModule, UserModule, ConfigUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
