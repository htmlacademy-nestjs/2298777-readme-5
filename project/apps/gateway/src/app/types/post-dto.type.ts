import { ImagePostDto } from '../dto/image-post.dto';
import { LinkPostDto } from '../dto/link-post.dto';
import { QuotePostDto } from '../dto/quote-post.dto';
import { TextPostDto } from '../dto/text-post.dto';
import { VideoPostDto } from '../dto/video-post.dto';

export type PostDto = ImagePostDto | VideoPostDto | TextPostDto | QuotePostDto | LinkPostDto;
