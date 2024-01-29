import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { TokenPayload, User } from '@project/shared/types';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
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

export const getRabbitMQConnectionString = (
  user: string,
  password: string,
  host: string,
  port: number
) => `amqp://${user}:${password}@${host}:${port}`;

export const parseTime = (time: string): TimeAndUnit => {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error('Invalid time format');
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error('Invalid time format');
  }

  return { value, unit };
};

export const createJwtPayload = (user: User): TokenPayload => ({
  id: user.id!,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
});
