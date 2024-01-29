import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/types';
import { IsString } from 'class-validator';

export class QuotePostDto {
  @ApiProperty({
    type: String,
    description: 'Post quote',
    example: 'Post quote',
  })
  @IsString()
  public quote: string;

  @ApiProperty({
    type: String,
    description: 'Post quote author',
    example: 'Post quote author',
  })
  @IsString()
  public quoteAuthor: string;

  @ApiProperty({
    type: [String],
    description: 'Post tags',
    example: ['tag1', 'tag2'],
  })
  @IsString({ each: true })
  public tags?: string[];

  public type: PostType = PostType.Quote;
}
