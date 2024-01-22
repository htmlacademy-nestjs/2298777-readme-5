import { UnauthorizedException } from '@nestjs/common';

export class TokenNotExistsException extends UnauthorizedException {
  constructor(tokenId: string) {
    super(`Token with id: ${tokenId} does not exists`);
  }
}
