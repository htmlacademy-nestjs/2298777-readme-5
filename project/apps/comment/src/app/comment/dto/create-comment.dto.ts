import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Post id',
    example: '1',
    type: String,
  })
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'This is a comment',
    type: String,
  })
  public text: string;

  @ApiProperty({
    description: 'Author id',
    example: '1',
    type: String,
  })
  public authorId: string;
}
