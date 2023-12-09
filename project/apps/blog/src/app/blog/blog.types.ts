import {
  VideoPostEntity,
  TextPostEntity,
  QuotePostEntity,
  ImagePostEntity,
  LinkPostEntity,
} from '../post/entities';
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

export type PostDto = VideoPostDto | TextPostDto | QuotePostDto | ImagePostDto | LinkPostDto;
