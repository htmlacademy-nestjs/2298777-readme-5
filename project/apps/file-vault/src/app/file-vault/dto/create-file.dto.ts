import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '@project/shared/types';
import { IsString } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({
    type: String,
    description: 'The name of the file.',
    example: 'image.png',
  })
  @IsString()
  public imageUri: string;

  @ApiProperty({
    type: String,
    description: 'The type of the file.',
    example: 'avatar',
  })
  @IsString()
  public type: FileType;
}
