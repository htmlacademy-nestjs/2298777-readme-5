import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/types';

export class QuotePostDto {
  @ApiProperty({
    type: String,
    description: 'Post quote',
    example: 'Post quote',
  })
  public quote: string;

  @ApiProperty({
    type: String,
    description: 'Post quote author',
    example: 'Post quote author',
  })
  public quoteAuthor: string;

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

  public type: PostType = PostType.Quote;
}
