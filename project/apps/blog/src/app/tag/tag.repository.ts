import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createDecoratorProxy } from '@project/shared/core';

@Injectable()
export class TagRepository extends createDecoratorProxy<Prisma.TagsOnPostDelegate>(['deleteMany']) {
  public async detachTagsFromPosts(postId: string) {
    return this.deleteMany({ where: { postId } });
  }
}
