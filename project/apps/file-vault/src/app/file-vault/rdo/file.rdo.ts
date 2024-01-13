import { ApiProperty } from '@nestjs/swagger';
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
  public originalName: string;

  @ApiProperty({
    type: String,
    description: 'The hash name of the file.',
    example: '13231',
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    type: String,
    description: 'The mime type of the file.',
    example: 'image/png',
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    type: String,
    description: 'The size of the file.',
    example: 100,
  })
  @Expose()
  public size: number;

  @ApiProperty({
    type: String,
    description: 'The directory of the file.',
    example: '/static',
  })
  @Expose()
  public directory: string;
}
