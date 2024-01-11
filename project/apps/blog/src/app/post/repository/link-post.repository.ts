import { Injectable } from '@nestjs/common';
import { createDecoratorProxy } from '@project/shared/core';
import { Prisma } from '@prisma/client';
import { LinkPostEntity } from '../entities';
import { MakeEntityInterface } from './make-entity.interface';

@Injectable()
export class LinkPostRepository
  extends createDecoratorProxy<Prisma.LinkPostDelegate>([
    'create',
    'delete',
    'findFirst',
    'findMany',
    'update',
    'findUnique',
  ])
  implements MakeEntityInterface<LinkPostEntity>
{
  makeEntityFromObject(obj: Record<string, unknown>) {
    return LinkPostEntity.fromObject(obj as any);
  }
}
