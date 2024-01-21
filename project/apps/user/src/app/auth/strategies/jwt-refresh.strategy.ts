import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'shared/config/src/lib/jwt/jwt.config';
import { AuthService } from '../auth.service';
import { TokenPayload } from '@project/shared/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: TokenPayload) {
    this.authService.getUser(payload.email);
  }
}
