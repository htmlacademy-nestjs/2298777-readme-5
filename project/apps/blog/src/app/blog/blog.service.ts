import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRepository } from '../post/post.repository';
import { LikeRepository } from '../like/like.repository';
import { filterOptions } from './filter-option.enum';
import { sortDate } from '@project/shared/utils';
import {
  ImagePostEntity,
  QuotePostEntity,
  VideoPostEntity,
  TextPostEntity,
  LinkPostEntity,
} from '../post/entities';
import { VideoPostDto, TextPostDto, QuotePostDto, ImagePostDto, LinkPostDto } from './dto';
import { PostStatus } from '@project/shared/types';

type PostEntity =
  | VideoPostEntity
  | TextPostEntity
  | QuotePostEntity
  | ImagePostEntity
  | LinkPostEntity;

@Injectable()
export class BlogService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly likeRepository: LikeRepository
  ) {}

  public async filter(filterOption: filterOptions, quantity?: number) {
    let result: PostEntity[];
    switch (filterOption) {
      case filterOptions.Like:
        result = (await this.postRepository.getPosts()).sort(
          (post1, post2) => post1.likesCount - post2.likesCount
        );
      case filterOptions.Popular:
        result = (await this.postRepository.getPosts()).sort(
          (post1, post2) => post1.commentsCount - post2.commentsCount
        );
      default:
        result = (await this.postRepository.getPosts()).sort((post1, post2) =>
          sortDate(post1.createDate, post2.createDate)
        );
    }
    const mappedResult = result.slice(0, quantity).map(async (post) => {
      const likes = await this.likeRepository.countLikes(post.id!);
      post.setLikesCount(likes);
      return post;
    });
    result = await Promise.all(mappedResult);
    return result;
  }

  public async createVideo(post: VideoPostDto) {
    const postEntity = new VideoPostEntity({
      name: post.name,
      tags: post.tags,
      videoUrl: post.videoUrl,
      authorId: post.authorId,
      status: PostStatus.Draft,
      createDate: new Date(),
      likesCount: 0,
      commentsCount: 0,
    });
    return this.postRepository.save(postEntity);
  }

  public async createText(post: TextPostDto) {
    const postEntity = new TextPostEntity({
      name: post.name,
      anonsText: post.anonsText,
      tags: post.tags,
      text: post.text,
      authorId: post.authorId,
      status: PostStatus.Draft,
      createDate: new Date(),
      likesCount: 0,
      commentsCount: 0,
    });
    return this.postRepository.save(postEntity);
  }

  public async createQuote(post: QuotePostDto) {
    const postEntity = new QuotePostEntity({
      quote: post.quote,
      quoteAuthor: post.quoteAuthor,
      tags: post.tags,
      authorId: post.authorId,
      status: PostStatus.Draft,
      createDate: new Date(),
      likesCount: 0,
      commentsCount: 0,
    });
    return this.postRepository.save(postEntity);
  }

  public async createImage(post: ImagePostDto) {
    const postEntity = new ImagePostEntity({
      imageUrl: post.imageUrl,
      tags: post.tags,
      authorId: post.authorId,
      status: PostStatus.Draft,
      createDate: new Date(),
      likesCount: 0,
      commentsCount: 0,
    });
    return this.postRepository.save(postEntity);
  }

  public async createLink(post: LinkPostDto) {
    const postEntity = new LinkPostEntity({
      linkUrl: post.linkUrl,
      description: post.description,
      tags: post.tags,
      authorId: post.authorId,
      status: PostStatus.Draft,
      createDate: new Date(),
      likesCount: 0,
      commentsCount: 0,
    });
    return this.postRepository.save(postEntity);
  }

  public async likeHandle(postId: string, userId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    if ((await this.likeRepository.find(postId, userId)) === null) {
      await this.likeRepository.likePost(postId, userId);
      post.setLikesCount(post.likesCount + 1);
    } else {
      await this.likeRepository.unlikePost(postId, userId);
      post.setLikesCount(post.likesCount - 1);
    }
    return post;
  }

  public async getPost(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const likes = await this.likeRepository.countLikes(post.id!);
    post.setLikesCount(likes);
    return post;
  }
}
