import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/types';
import { IsString } from 'class-validator';

export class TextPostDto {
  @ApiProperty({
    type: String,
    description: 'Post name',
    example: 'Post name',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Post anons text',
    example: 'Post anons text',
  })
  @IsString()
  public anonsText: string;

  @ApiProperty({
    type: String,
    description: 'Post text',
    example: 'Post text',
  })
  @IsString()
  public text: string;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: ['tag1', 'tag2'],
  })
  @IsString({ each: true })
  public tags?: string[];

  public type: PostType = PostType.Text;
}
