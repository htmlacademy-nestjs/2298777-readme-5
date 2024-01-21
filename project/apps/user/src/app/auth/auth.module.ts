import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/shared/config';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
  ],
  providers: [AuthService, JWTAccessStrategy, LocalStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
