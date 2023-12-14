import { ApiProperty } from '@nestjs/swagger';
import { PostStatus } from '@project/shared/types';

export class UpdatePostDto {
  @ApiProperty({
    type: String,
    description: 'Post tags',
    example: ['tag1', 'tag2', 'tag3'],
  })
  public tags?: string[];

  @ApiProperty({
    type: String,
    description: 'Post status',
    example: PostStatus.Published,
  })
  public status?: PostStatus;

  public name?: string;

  public videoUrl?: string;

  public text?: string;

  public anonsText?: string;

  public quote?: string;

  public quoteAuthor?: string;

  public imageUrl?: string;

  public linkUrl?: string;

  public description?: string;
}
