import { PostEntity } from '../../blog/blog.types';

export interface MakeEntityInterface<T extends PostEntity> {
  makeEntityFromObject(obj: Record<string, unknown>): T;
}
