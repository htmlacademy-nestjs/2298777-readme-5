import { ApiProperty } from '@nestjs/swagger';
import { PostStatus } from '@project/shared/types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    type: String,
    description: 'Post tags',
    example: ['tag1', 'tag2', 'tag3'],
  })
  @IsString({ each: true })
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    type: String,
    description: 'Post status',
    example: PostStatus.Published,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public status?: PostStatus;

  @ApiProperty({
    type: String,
    description: 'Post name',
    example: 'Post name',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    type: String,
    description: 'Post video url',
    example: 'https://www.youtube.com/watch?v=6n3pFFPSlW4',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public videoUrl?: string;

  @ApiProperty({
    type: String,
    description: 'Post text',
    example: 'Post text',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    type: String,
    description: 'Post anons text',
    example: 'Post anons text',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public anonsText?: string;

  @ApiProperty({
    type: String,
    description: 'Post quote',
    example: 'Post quote',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public quote?: string;

  @ApiProperty({
    type: String,
    description: 'Post quote author',
    example: 'Post quote author',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public quoteAuthor?: string;

  @ApiProperty({
    type: String,
    description: 'Post image url',
    example: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public imageUrl?: string;

  @ApiProperty({
    type: String,
    description: 'Post link url',
    example: 'https://www.google.com/',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public linkUrl?: string;

  @ApiProperty({
    type: String,
    description: 'Post link description',
    example: 'Post link description',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;
}
