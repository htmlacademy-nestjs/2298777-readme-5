import { ApiProperty } from '@nestjs/swagger';

export class TextPostDto {
  @ApiProperty({
    type: String,
    description: 'Post name',
    example: 'Post name',
  })
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Post anons text',
    example: 'Post anons text',
  })
  public anonsText: string;

  @ApiProperty({
    type: String,
    description: 'Post text',
    example: 'Post text',
  })
  public text: string;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: ['tag1', 'tag2'],
  })
  public tags?: string[];

  @ApiProperty({
    type: String,
    description: 'Post author id',
    example: '5f8d0f3d9d5b1d1d1b7f1a6d',
  })
  public authorId: string;

  public type: 'text' = 'text';
}
