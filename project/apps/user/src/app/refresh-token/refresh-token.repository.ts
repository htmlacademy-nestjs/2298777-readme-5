import { Model } from 'mongoose';
import { RefreshTokenModel } from './refresh-token.model';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenEntity } from './refresh-token.entity';
import { TokenWithId } from '@project/shared/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    private readonly refreshTokenModel: Model<RefreshTokenModel>
  ) {}

  public async create(token: RefreshTokenEntity): Promise<TokenWithId> {
    return new this.refreshTokenModel(token).save();
  }

  public async deleteByTokenId(tokenId: string) {
    return this.refreshTokenModel.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(tokenId: string): Promise<TokenWithId | null> {
    return this.refreshTokenModel.findOne({ tokenId }).exec();
  }

  public async deleteExpiredTokens() {
    return this.refreshTokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
  }
}
