import { createDecoratorProxy } from '@project/shared/core';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository extends createDecoratorProxy<Prisma.PostDelegate>([
  'create',
  'delete',
  'findFirst',
  'findMany',
  'update',
  'findUnique',
]) {}
