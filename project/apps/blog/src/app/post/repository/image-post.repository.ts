import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createDecoratorProxy } from '@project/shared/core';
import { ImagePostEntity } from '../entities';
import { MakeEntityInterface } from './make-entity.interface';

@Injectable()
export class ImagePostRepository
  extends createDecoratorProxy<Prisma.ImagePostDelegate>([
    'create',
    'delete',
    'findFirst',
    'findMany',
    'update',
    'findUnique',
  ])
  implements MakeEntityInterface<ImagePostEntity>
{
  makeEntityFromObject(obj: Record<string, unknown>): ImagePostEntity {
    return ImagePostEntity.fromObject(obj as any);
  }
}
