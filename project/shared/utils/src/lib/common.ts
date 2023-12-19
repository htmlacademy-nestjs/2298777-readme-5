import { ClassTransformOptions, plainToInstance } from 'class-transformer';

type PlainObject = Record<string, unknown>;

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export const sortDate = (a: Date, b: Date) => {
  return a.getTime() - b.getTime();
};

export const getMongoConnectionUri = (
  user: string,
  password: string,
  host: string,
  port: number,
  dbName: string,
  authDatabase: string
): string => `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=${authDatabase}`;
