import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtOptions = async (configService: ConfigService): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('jwt.accessTokenSecret'),
  signOptions: {
    expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
    algorithm: 'HS256',
  },
});
