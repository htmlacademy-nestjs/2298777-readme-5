import { Entity, EntityId } from './entity.interface';
import { Repository } from './repository.interface';
import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityId>,
  DocumentType extends Document
> implements Repository<EntityType>
{
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  protected createEntityFromDocument(document: DocumentType | null): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document.toObject({ versionKey: false }));
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();
    return this.createEntityFromDocument(document);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const newEntity = new this.model(entity);
    await newEntity.save();

    entity.id = newEntity._id.toString();
    return entity;
  }

  public async updateById(id: EntityType['id'], entity: EntityType): Promise<EntityType> {
    const updateDocument = await this.model.findByIdAndUpdate(id, entity, {
      new: true,
      runValidators: true,
    });

    if (!updateDocument) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    const document = await this.model.findByIdAndDelete(id).exec();
    if (!document) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
