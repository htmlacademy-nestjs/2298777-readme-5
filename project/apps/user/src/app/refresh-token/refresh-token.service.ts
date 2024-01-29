import { ConfigType } from '@nestjs/config';
import { RefreshTokenRepository } from './refresh-token.repository';
import jwtConfig from 'shared/config/src/lib/jwt/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenPayload } from '@project/shared/types';
import { parseTime } from '@project/shared/utils';
import { RefreshTokenEntity } from './refresh-token.entity';
import dayjs from 'dayjs';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async createRefreshToken(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.id,
      expiresAt: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.refreshTokenRepository.deleteExpiredTokens();
    return this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
    return refreshToken !== null;
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
