import { ApiProperty } from '@nestjs/swagger';
import { PostStatus } from '@project/shared/types';
import { Expose } from 'class-transformer';

export class PostRdo {
  @ApiProperty({
    type: Array.of(String),
    description: 'Post tags',
    example: ['tag1', 'tag2'],
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    type: String,
    description: 'Post author id',
    example: '1',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    type: Date,
    description: 'Post create date',
    example: '2020-01-01T00:00:00.000Z',
  })
  @Expose()
  public createDate: Date;

  @ApiProperty({
    type: Date,
    description: 'Post publish date',
    example: '2020-01-01T00:00:00.000Z',
  })
  @Expose()
  public publishDate?: Date;

  @ApiProperty({
    type: String,
    description: 'Post status',
    example: PostStatus.Draft,
  })
  @Expose()
  public status: PostStatus;

  @ApiProperty({
    type: String,
    description: 'Post original author id',
    example: '2',
  })
  @Expose()
  public originalAuthorId?: string;

  @ApiProperty({
    type: String,
    description: 'Post original post id',
    example: '3',
  })
  @Expose()
  public originalPostId?: string;

  @ApiProperty({
    type: Number,
    description: 'Post likes count',
    example: 0,
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    type: Number,
    description: 'Post comments count',
    example: 0,
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    type: String,
    description: 'Post name',
    example: 'Post name',
  })
  @Expose()
  public name?: string;

  @ApiProperty({
    type: String,
    description: 'Post video url',
    example: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
  })
  @Expose()
  public videoUrl?: string;

  @ApiProperty({
    type: String,
    description: 'Post text',
    example: 'Post text',
  })
  @Expose()
  public text?: string;

  @ApiProperty({
    type: String,
    description: 'Post anons text',
    example: 'Post anons text',
  })
  @Expose()
  public anonsText?: string;

  @ApiProperty({
    type: String,
    description: 'Post quote',
    example: 'Post quote',
  })
  @Expose()
  public quote?: string;

  @ApiProperty({
    type: String,
    description: 'Post quote author',
    example: 'Post quote author',
  })
  @Expose()
  public quoteAuthor?: string;

  @ApiProperty({
    type: String,
    description: 'Post image url',
    example: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  })
  @Expose()
  public imageUrl?: string;

  @ApiProperty({
    type: String,
    description: 'Post link url',
    example: 'https://www.google.com/',
  })
  @Expose()
  public linkUrl?: string;

  @ApiProperty({
    type: String,
    description: 'Post link description',
    example: 'Post link description',
  })
  @Expose()
  public description?: string;
}
