import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment id',
    example: '5f8d0c1a-8b7a-4b0c-9b0a-0b9c0b1a9d0a',
    type: String,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Post id',
    example: '1',
    type: String,
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Author id',
    example: '1',
    type: String,
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'This is a comment',
    type: String,
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Comment date',
    example: '2020-10-19T17:59:59.000Z',
    type: Date,
  })
  @Expose()
  public date: Date;
}
