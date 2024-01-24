export interface TokenPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface TokenWithId {
  id?: string;
  tokenId: string;
  createdAt: Date;
  userId: string;
  expiresAt: Date;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenId: string;
}

export interface RequestWithTokenPayload {
  user?: TokenWithId;
}
