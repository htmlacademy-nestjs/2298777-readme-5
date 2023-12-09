import { ApiProperty } from '@nestjs/swagger';

export class VideoPostDto {
  @ApiProperty({
    type: String,
    description: 'Post name',
    example: 'Post name',
  })
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Post video url',
    example: 'https://www.youtube.com/watch?v=6n3pFFPSlW4',
  })
  public videoUrl: string;

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

  public type: 'video' = 'video';
}
