import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '@project/shared/types';

export class CreateFileDto {
  @ApiProperty({
    type: String,
    description: 'The name of the file.',
    example: 'image.png',
  })
  public imageUri: string;
  @ApiProperty({
    type: String,
    description: 'The type of the file.',
    example: 'avatar',
  })
  public type: FileType;
}
