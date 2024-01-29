import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/types';
import { IsString } from 'class-validator';

export class VideoPostDto {
  @ApiProperty({
    type: String,
    description: 'Post name',
    example: 'Post name',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Post video url',
    example: 'https://www.youtube.com/watch?v=6n3pFFPSlW4',
  })
  @IsString()
  public videoUrl: string;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: ['tag1', 'tag2'],
  })
  @IsString({ each: true })
  public tags?: string[];

  public type: PostType = PostType.Video;
}
