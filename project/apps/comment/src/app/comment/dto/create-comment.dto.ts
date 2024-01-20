import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Post id',
    example: '1',
    type: String,
  })
  @IsString()
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'This is a comment',
    type: String,
  })
  @IsString()
  public text: string;

  @ApiProperty({
    description: 'Author id',
    example: '1',
    type: String,
  })
  @IsString()
  public authorId: string;
}
