import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createDecoratorProxy } from '@project/shared/core';

@Injectable()
export class SubscribeRepository extends createDecoratorProxy<Prisma.SubscriptionDelegate>([
  'create',
  'findFirst',
  'count',
  'delete',
  'findMany',
]) {
  public async countSubscribers(authorId: string) {
    return await this.count({
      where: {
        authorId,
      },
    });
  }

  public async findSubscribers(authorId: string) {
    return await this.findMany({
      where: {
        authorId,
      },
    });
  }

  public async findSubscribedAuthors(userId: string) {
    return await this.findMany({
      where: {
        userId,
      },
    });
  }

  public async findSubscription(authorId: string, userId: string) {
    return await this.findFirst({
      where: {
        authorId: authorId,
        userId: userId,
      },
    });
  }

  public async deleteSubscription(authorId: string, userId: string) {
    const foundSubscription = await this.findSubscription(authorId, userId);
    if (!foundSubscription) {
      return null;
    }
    const deletedSubscription = await this.delete({
      where: {
        id: foundSubscription.id,
      },
    });
    return deletedSubscription;
  }

  public async createSubscription(authorId: string, userId: string) {
    const foundSubscription = await this.findSubscription(authorId, userId);
    if (foundSubscription) {
      return null;
    }
    const newSubscription = await this.create({
      data: {
        authorId,
        userId,
      },
    });
    return newSubscription;
  }
}
