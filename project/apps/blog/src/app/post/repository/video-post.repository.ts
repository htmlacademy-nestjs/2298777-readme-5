import { Injectable } from '@nestjs/common';
import { createDecoratorProxy } from '@project/shared/core';
import { Prisma } from '@prisma/client';
import { VideoPostEntity } from '../entities';
import { MakeEntityInterface } from './make-entity.interface';

@Injectable()
export class VideoPostRepository
  extends createDecoratorProxy<Prisma.VideoPostDelegate>([
    'create',
    'delete',
    'findFirst',
    'findMany',
    'update',
    'findUnique',
  ])
  implements MakeEntityInterface<VideoPostEntity>
{
  makeEntityFromObject(obj: Record<string, unknown>) {
    return VideoPostEntity.fromObject(obj as any);
  }
}
