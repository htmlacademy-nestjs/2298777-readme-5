import { PostStatus } from './post.enum';

export interface Post {
  id?: string;
  name: string;
  tags?: string[];
  authorId: string;
  createDate: Date;
  publishDate: Date;
  status: PostStatus;
  originalAuthorId?: string;
  originalPostId?: string;
  likesCount: number;
}

export interface VideoPost extends Post {
  videoUrl: string;
}

export interface TextPost extends Post {
  text: string;
  anonsText: string;
}

export interface QuotePost extends Pick<Post, 'tags'> {
  quote: string;
  quoteAuthor: string;
}

export interface ImagePost extends Pick<Post, 'tags'> {
  imageUrl: string;
}

export interface LinkPost extends Pick<Post, 'tags'> {
  linkUrl: string;
  description: string;
}
