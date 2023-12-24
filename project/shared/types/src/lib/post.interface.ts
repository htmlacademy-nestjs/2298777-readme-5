import { PostType } from './post-type.enum';
import { PostStatus } from './post.enum';

export interface Post {
  id?: string;
  tags?: string[];
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishDate?: Date;
  status: PostStatus;
  originalAuthorId?: string;
  originalPostId?: string;
  likesCount: number;
  commentsCount: number;
  type: PostType;
}

export interface VideoPost extends Post {
  name: string;
  videoUrl: string;
}

export interface TextPost extends Post {
  name: string;
  text: string;
  anonsText: string;
}

export interface QuotePost extends Post {
  quote: string;
  quoteAuthor: string;
}

export interface ImagePost extends Post {
  imageUrl: string;
}

export interface LinkPost extends Post {
  linkUrl: string;
  description: string;
}
