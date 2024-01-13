import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRepositoryService } from '../post/post.repository.service';
import { LikeRepository } from '../like/like.repository';
import { filterOptions } from './filter-option.enum';
import { sortDate } from '@project/shared/utils';
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
import { PostType } from '@project/shared/types';
import { ResultPostEntity } from '../post/entities/result-post.entity';
import { LikeEntity } from '../like/like.entity';

@Injectable()
export class BlogService {
  constructor(
    private readonly postRepository: PostRepositoryService,
    private readonly likeRepository: LikeRepository
  ) {}

  public async filter(filterOption: filterOptions, quantity: number, next: number) {
    const start = next * quantity;
    const result = this.postRepository.getPosts(quantity, start, filterOption);

    return result;
  }

  public async createPost<T extends PostDto>(post: T): Promise<ResultPostEntity> {
    const basePost = new BasePostEntity({
      ...defaultCreateValues,
      ...post,
    });
    const postEntity = this.createPostEntity(post);
    return this.postRepository.save(basePost, postEntity, post.type);
  }

  public async likeHandle(postId: string, userId: string) {
    const post = await this.postRepository.findById(postId);
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

  public async deletePost(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    await this.postRepository.deleteById(id);
    return;
  }

  public async updatePost(id: string, updatedPost: UpdatePostDto) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const basePost = new BasePostEntity({
      ...post,
      ...updatedPost,
    });
    const postEntity = this.createPostEntity({
      ...updatedPost,
      type: post.type,
    } as PostDto);
    return this.postRepository.update(basePost, postEntity);
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
