export type EntityId = string;

export type DefaultPojoType = Record<string, unknown>;

export interface Entity<T extends EntityId, PojoType = DefaultPojoType> {
  id?: T;
  toPojo(): PojoType;
}
