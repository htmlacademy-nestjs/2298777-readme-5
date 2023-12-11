import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/types';

export class ImagePostDto {
  @ApiProperty({
    type: String,
    description: 'Post image url',
    example: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  })
  public imageUrl: string;

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

  public type: PostType = PostType.Image;
}
