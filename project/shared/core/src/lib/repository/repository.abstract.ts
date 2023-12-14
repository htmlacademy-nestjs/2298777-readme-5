import { Entity, EntityId } from '.';
import { Repository } from './repository.interface';
import { randomUUID } from 'node:crypto';

export abstract class BaseRepository<T extends Entity<EntityId>> implements Repository<T> {
  private _entities: Map<T['id'], T> = new Map();

  public get entities() {
    return this._entities;
  }

  public findById(id: T['id']): Promise<T | null> {
    return Promise.resolve(this.entities.get(id) || null);
  }

  public save(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    this.entities.set(entity.id, entity);
    return Promise.resolve(entity);
  }

  public deleteById(id: T['id']): Promise<void> {
    this.entities.delete(id);
    return Promise.resolve();
  }

  public updateById(id: T['id'], entity: T): Promise<T> {
    if (!this.entities.has(id)) {
      throw new Error(`Entity with id ${id} not found`);
    }

    this.entities.set(id, entity);
    return Promise.resolve(entity);
  }
}
