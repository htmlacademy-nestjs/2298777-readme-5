import { Entity, EntityId } from './entity.interface';

export interface Repository<T extends Entity<EntityId>> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<T>;
  updateById(id: T['id'], entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
