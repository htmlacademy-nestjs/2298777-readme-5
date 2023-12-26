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

export interface VideoPost {
  name: string;
  videoUrl: string;
}

export interface TextPost {
  name: string;
  text: string;
  anonsText: string;
}

export interface QuotePost {
  quote: string;
  quoteAuthor: string;
}

export interface ImagePost {
  imageUrl: string;
}

export interface LinkPost {
  linkUrl: string;
  description: string;
}

export interface ResultingPost extends Post {
  name?: string;
  videoUrl?: string;
  text?: string;
  anonsText?: string;
  quote?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  linkUrl?: string;
  description?: string;
}
