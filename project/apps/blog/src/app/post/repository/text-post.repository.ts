import { Injectable } from '@nestjs/common';
import { createDecoratorProxy } from '@project/shared/core';
import { Prisma } from '@prisma/client';
import { TextPostEntity } from '../entities';
import { MakeEntityInterface } from './make-entity.interface';

@Injectable()
export class TextPostRepository
  extends createDecoratorProxy<Prisma.TextPostDelegate>([
    'create',
    'delete',
    'findFirst',
    'findMany',
    'update',
    'findUnique',
  ])
  implements MakeEntityInterface<TextPostEntity>
{
  makeEntityFromObject(obj: Record<string, unknown>) {
    return TextPostEntity.fromObject(obj as any);
  }
}
