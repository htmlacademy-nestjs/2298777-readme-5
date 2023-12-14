import {
  VideoPostEntity,
  TextPostEntity,
  QuotePostEntity,
  ImagePostEntity,
  LinkPostEntity,
} from '../post/entities';
import {
  ImagePostRepository,
  LinkPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
} from '../post/repository';
import { VideoPostDto, TextPostDto, QuotePostDto, ImagePostDto, LinkPostDto } from './dto';

export type PostEntity =
  | VideoPostEntity
  | TextPostEntity
  | QuotePostEntity
  | ImagePostEntity
  | LinkPostEntity;

export type PostEntityForDto<T> = T extends VideoPostDto
  ? VideoPostEntity
  : T extends TextPostDto
  ? TextPostEntity
  : T extends QuotePostDto
  ? QuotePostEntity
  : T extends ImagePostDto
  ? ImagePostEntity
  : T extends LinkPostDto
  ? LinkPostEntity
  : never;

export type PostRepositoryForEntity<T> = T extends VideoPostEntity
  ? VideoPostRepository
  : T extends TextPostEntity
  ? TextPostRepository
  : T extends QuotePostEntity
  ? QuotePostRepository
  : T extends ImagePostEntity
  ? ImagePostRepository
  : T extends LinkPostEntity
  ? LinkPostRepository
  : never;

export type PostDto = VideoPostDto | TextPostDto | QuotePostDto | ImagePostDto | LinkPostDto;
