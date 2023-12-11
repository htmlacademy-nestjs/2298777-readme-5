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
} from '../post/entities';
import { UpdatePostDto } from './dto';
import { defaultCreateValues } from './default-create-values';
import type { PostDto, PostEntity, PostEntityForDto } from './blog.types';
import { PostType } from '@project/shared/types';
@Injectable()
export class BlogService {
  constructor(
    private readonly postRepository: PostRepositoryService,
    private readonly likeRepository: LikeRepository
  ) {}

  public async filter(filterOption: filterOptions, quantity: number, next: number) {
    const start = next * quantity;
    const end = start + quantity;
    let result: PostEntity[];
    switch (filterOption) {
      case filterOptions.Like:
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
          sortDate(post2.createDate!, post1.createDate!)
        );
        break;
    }
    return result.slice(start, end);
  }

  public async createPost<T extends PostDto>(post: T): Promise<PostEntityForDto<T>> {
    const postEntity = this.createPostEntity(post);
    return this.postRepository.save(postEntity, post.type) as Promise<PostEntityForDto<T>>;
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
    const post = await this.postRepository.findById(id);
    console.log(post);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    await this.postRepository.deleteById(id, post.type);
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
      case PostType.Video:
        return new VideoPostEntity({
          ...defaultCreateValues,
          ...(post as VideoPostEntity),
        }) as PostEntityForDto<T>;
      case PostType.Text:
        return new TextPostEntity({
          ...defaultCreateValues,
          ...(post as TextPostEntity),
        }) as PostEntityForDto<T>;
      case PostType.Quote:
        return new QuotePostEntity({
          ...defaultCreateValues,
          ...(post as QuotePostEntity),
        }) as PostEntityForDto<T>;
      case PostType.Image:
        return new ImagePostEntity({
          ...defaultCreateValues,
          ...(post as ImagePostEntity),
        }) as PostEntityForDto<T>;
      case PostType.Link:
        return new LinkPostEntity({
          ...defaultCreateValues,
          ...(post as LinkPostEntity),
        }) as PostEntityForDto<T>;
      default:
        throw new Error('Post type not found');
    }
  }
}
