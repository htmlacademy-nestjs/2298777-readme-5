import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('MongoIdValidationPipe must be used on param');
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ID!');
    }

    return value;
  }
}
