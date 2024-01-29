import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRepositoryService } from '../post/post.repository.service';
import { LikeRepository } from '../like/like.repository';
import { filterOptions } from './filter-option.enum';
import {
  ImagePostEntity,
  QuotePostEntity,
  VideoPostEntity,
  TextPostEntity,
  LinkPostEntity,
  BasePostEntity,
} from '../post/entities';
import {
  ImagePostDto,
  LinkPostDto,
  QuotePostDto,
  TextPostDto,
  UpdatePostDto,
  VideoPostDto,
} from './dto';
import { defaultCreateValues } from './default-create-values';
import type { PostDto, PostEntityForDto } from './blog.types';
import { PostType, RabbitRouting } from '@project/shared/types';
import { ResultPostEntity } from '../post/entities/result-post.entity';
import { LikeEntity } from '../like/like.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class BlogService {
  constructor(
    private readonly postRepository: PostRepositoryService,
    private readonly likeRepository: LikeRepository,
    private readonly rabbitClient: AmqpConnection
  ) {}

  public async filter(filterOption: filterOptions, quantity: number, next: number, tags: string[]) {
    const start = next * quantity;
    const setTags = this.checkTags(tags);
    const result = this.postRepository.getPosts(quantity, start, filterOption, setTags);

    return result;
  }

  public async createPost<T extends PostDto>(post: T): Promise<ResultPostEntity> {
    const setTags = this.checkTags(post.tags!);
    const basePost = new BasePostEntity({
      ...defaultCreateValues,
      ...post,
      tags: setTags,
    });
    const postEntity = this.createPostEntity(post);

    const result = await this.postRepository.save(basePost, postEntity, post.type);

    this.rabbitClient.publish('readme.user.income', RabbitRouting.Post, {
      authorId: result.authorId,
      method: 'create',
    });

    return result;
  }

  public async likeHandle(postId: string, userId: string) {
    const post = await this.postRepository.findById(postId);
    if (post?.status === 'draft') {
      throw new BadRequestException('You can not like draft post');
    }
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const like = new LikeEntity({ postId, userId });
    if (await this.likeRepository.findLike(like)) {
      await this.likeRepository.deleteLike(like);
    } else {
      await this.likeRepository.createLike(like);
    }

    const updatedPost = BasePostEntity.fromObject({
      ...post,
      likesCount: await this.likeRepository.countLikes(postId),
    });

    return await this.postRepository.update(updatedPost);
  }

  public async getPost(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  public async deletePost(id: string, authorId: string) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    if (post.authorId !== authorId) {
      throw new BadRequestException('You are not author of this post');
    }
    await this.postRepository.deleteById(id);

    this.rabbitClient.publish('readme.user.income', RabbitRouting.Post, {
      authorId: post.authorId,
      method: 'delete',
    });

    return;
  }

  public async updatePost(id: string, updatedPost: UpdatePostDto) {
    const setTags = this.checkTags(updatedPost.tags!);

    const post = await this.postRepository.findById(id);
    if (updatedPost.authorId !== post?.authorId) {
      throw new BadRequestException('You are not author of this post');
    }
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const basePost = new BasePostEntity({
      ...post,
      ...updatedPost,
      tags: setTags,
    });
    const postEntity = this.createPostEntity({
      ...updatedPost,
      type: post.type,
    } as PostDto);
    return this.postRepository.update(basePost, postEntity);
  }

  public async findPostsByWords(words: string[], next: number, quantity: number) {
    if (words.length === 0) {
      throw new BadRequestException('Keywords is empty');
    }
    const start = next * quantity;
    const posts = await this.postRepository.findPostsByWords(words, start, quantity);
    return posts;
  }

  public async decreaseCommentsCount(postId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const updatedPost = BasePostEntity.fromObject({
      ...post,
      commentsCount: post.commentsCount - 1,
    });
    return await this.postRepository.update(updatedPost);
  }

  public async increaseCommentsCount(postId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const updatedPost = BasePostEntity.fromObject({
      ...post,
      commentsCount: post.commentsCount + 1,
    });
    return await this.postRepository.update(updatedPost);
  }

  public async repost(postId: string, userId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    if (post.authorId === userId) {
      throw new BadRequestException('You can not repost your own post or repost twice');
    }
    const repost = new BasePostEntity({
      tags: post.tags,
      authorId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishDate: post.publishDate,
      status: post.status,
      originalAuthorId: post.authorId,
      originalPostId: post.id,
      likesCount: 0,
      commentsCount: 0,
      type: post.type,
    });

    const typedPost = this.createPostEntity({
      ...post,
      type: post.type,
    } as PostDto);

    return await this.postRepository.save(repost, typedPost, post.type);
  }

  public async getSubscribedPosts(
    authorIds: string[],
    next: number,
    quantity: number,
    filter: filterOptions
  ) {
    if (!authorIds || authorIds.length === 0) {
      throw new BadRequestException('authorIds is empty');
    }
    const start = next * quantity;
    const posts = await this.postRepository.getSubscribedPosts(authorIds, start, quantity, filter);
    return posts;
  }

  private checkTags(tags: string[]) {
    const lowercaseTags = tags.map((tag) => tag.toLowerCase());
    const setTags = [...new Set(lowercaseTags)].filter((tag) => {
      if (tag.length < 3 || tag.length > 10) {
        throw new BadRequestException('Tag length must be between 3 and 10');
      }
      if (tag.split(' ').length > 1) {
        throw new BadRequestException('Tag can not contain spaces');
      }
      return true;
    });
    if (setTags && setTags.length > 8) {
      throw new BadRequestException('Too many tags');
    }
    return setTags;
  }

  private createPostEntity<T extends PostDto>(post: T): PostEntityForDto<T> {
    switch (post.type) {
      case PostType.Video:
        return new VideoPostEntity({
          ...(post as VideoPostDto),
        }) as PostEntityForDto<T>;
      case PostType.Text:
        return new TextPostEntity({
          ...(post as TextPostDto),
        }) as PostEntityForDto<T>;
      case PostType.Quote:
        return new QuotePostEntity({
          ...(post as QuotePostDto),
        }) as PostEntityForDto<T>;
      case PostType.Image:
        return new ImagePostEntity({
          ...(post as ImagePostDto),
        }) as PostEntityForDto<T>;
      case PostType.Link:
        return new LinkPostEntity({
          ...(post as LinkPostDto),
        }) as PostEntityForDto<T>;
      default:
        throw new Error('Post type not found');
    }
  }
}
