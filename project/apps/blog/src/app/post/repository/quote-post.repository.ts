import { Injectable } from '@nestjs/common';
import { createDecoratorProxy } from '@project/shared/core';
import { Prisma } from '@prisma/client';
import { QuotePostEntity } from '../entities';
import { MakeEntityInterface } from './make-entity.interface';

@Injectable()
export class QuotePostRepository
  extends createDecoratorProxy<Prisma.QuotePostDelegate>([
    'create',
    'delete',
    'findFirst',
    'findMany',
    'update',
    'findUnique',
  ])
  implements MakeEntityInterface<QuotePostEntity>
{
  makeEntityFromObject(obj: Record<string, unknown>) {
    return QuotePostEntity.fromObject(obj as any);
  }
}
