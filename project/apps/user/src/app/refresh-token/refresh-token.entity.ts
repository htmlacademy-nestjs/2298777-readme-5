import { Entity } from '@project/shared/core';
import { TokenWithId } from '@project/shared/types';

export class RefreshTokenEntity implements Entity<string>, TokenWithId {
  public id: string;
  public createdAt: Date;
  public expiresAt: Date;
  public userId: string;
  public tokenId: string;

  constructor(refreshToken: TokenWithId) {
    this.id = refreshToken.id!;
    this.createdAt = new Date();
    this.expiresAt = refreshToken.expiresAt;
    this.userId = refreshToken.userId;
    this.tokenId = refreshToken.tokenId;
  }

  public toPojo() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
      userId: this.userId,
      tokenId: this.tokenId,
    };
  }
}
