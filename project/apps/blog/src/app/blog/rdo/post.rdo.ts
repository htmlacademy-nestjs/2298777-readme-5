import { PostStatus } from '@project/shared/types';
import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose()
  public tags?: string[];

  @Expose()
  public authorId: string;

  @Expose()
  public createDate: Date;

  @Expose()
  public publishDate?: Date;

  @Expose()
  public status: PostStatus;

  @Expose()
  public originalAuthorId?: string;

  @Expose()
  public originalPostId?: string;

  @Expose()
  public likesCount: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  public name?: string;

  @Expose()
  public videoUrl?: string;

  @Expose()
  public text?: string;

  @Expose()
  public anonsText?: string;

  @Expose()
  public quote?: string;

  @Expose()
  public quoteAuthor?: string;

  @Expose()
  public imageUrl?: string;

  @Expose()
  public linkUrl?: string;

  @Expose()
  public description?: string;
}
