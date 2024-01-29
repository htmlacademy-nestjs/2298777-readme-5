import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/types';
import { IsString } from 'class-validator';

export class ImagePostDto {
  @ApiProperty({
    type: String,
    description: 'Post image url',
    example: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  })
  @IsString()
  public imageUrl: string;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: ['tag1', 'tag2'],
  })
  @IsString({ each: true })
  public tags?: string[];

  public type: PostType = PostType.Image;
}
