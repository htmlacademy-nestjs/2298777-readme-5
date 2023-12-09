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
import { UpdatePostDto } from './dto';
import { defaultCreateValues } from './default-create-values';
import type { PostDto, PostEntity, PostEntityForDto } from './blog.types';
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
        console.log('like');
        result = (await this.postRepository.getPosts()).sort(
          (post1, post2) => post2.likesCount - post1.likesCount
        );
        break;
      case filterOptions.Popular:
        result = (await this.postRepository.getPosts()).sort(
          (post1, post2) => post2.commentsCount - post1.commentsCount
        );
        break;
      default:
        result = (await this.postRepository.getPosts()).sort((post1, post2) =>
          sortDate(post1.createDate, post2.createDate)
        );
        break;
    }
    return result.slice(0, quantity);
  }

  public async createPost<T extends PostDto>(post: T): Promise<PostEntityForDto<T>> {
    const postEntity = this.createPostEntity(post);
    return this.postRepository.save(postEntity) as Promise<PostEntityForDto<T>>;
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
    return post;
  }

  public async deletePost(id: string) {
    if (!(await this.postRepository.findById(id))) {
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
    post.update(updatedPost);
    return post;
  }

  private createPostEntity<T extends PostDto>(post: T): PostEntityForDto<T> {
    switch (post.type) {
      case 'video':
        return new VideoPostEntity({
          ...defaultCreateValues,
          ...post,
        }) as PostEntityForDto<T>;
      case 'text':
        return new TextPostEntity({
          ...defaultCreateValues,
          ...post,
        }) as PostEntityForDto<T>;
      case 'quote':
        return new QuotePostEntity({
          ...defaultCreateValues,
          ...post,
        }) as PostEntityForDto<T>;
      case 'image':
        return new ImagePostEntity({
          ...defaultCreateValues,
          ...post,
        }) as PostEntityForDto<T>;
      case 'link':
        return new LinkPostEntity({
          ...defaultCreateValues,
          ...post,
        }) as PostEntityForDto<T>;
      default:
        throw new Error('Post type not found');
    }
  }
}
