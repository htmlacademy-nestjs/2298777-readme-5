import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '@project/shared/types';
import { Expose } from 'class-transformer';

export class FileRdo {
  @ApiProperty({
    type: String,
    description: 'The id of the file.',
    example: '1',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the file.',
    example: 'my-file',
  })
  @Expose()
  public imageUri: string;

  @ApiProperty({
    type: String,
    description: 'The type of the file.',
    example: 'image.png',
  })
  @Expose()
  public type: FileType;
}
