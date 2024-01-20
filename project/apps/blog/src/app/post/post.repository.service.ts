import { Injectable, Post } from '@nestjs/common';
import {
  ImagePostRepository,
  LinkPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
  PostRepository,
} from './repository';
import { PostEntity } from '../blog/blog.types';
import { PostType, ResultingPost } from '@project/shared/types';
import { BasePostEntity } from './entities';
import { ResultPostEntity } from './entities/result-post.entity';
import { filterOptions } from '../blog/filter-option.enum';
import { TagRepository } from '../tag/tag.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepositoryService {
  constructor(
    private readonly videoPostRepository: VideoPostRepository,
    private readonly linkPostRepository: LinkPostRepository,
    private readonly quotePostRepository: QuotePostRepository,
    private readonly textPostRepository: TextPostRepository,
    private readonly imagePostRepository: ImagePostRepository,
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository
  ) {}

  public async findById(id: string) {
    const post = await this.postRepository.findFirst({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    const repository = this.getRepositoryByType(post.type as PostType);
    const typedPost = await (repository.findFirst as any)({ where: { postId: id } });

    return ResultPostEntity.fromObject({
      ...post,
      ...typedPost,
      tags: post.tags.map((tag) => tag.tag.name),
    });
  }

  public async save<T extends PostEntity>(basePost: BasePostEntity, post: T, type: PostType) {
    const newPost = await this.postRepository.create({
      data: {
        authorId: basePost.authorId,
        updatedAt: basePost.updatedAt,
        status: basePost.status,
        type: basePost.type,
        tags: {
          create: basePost.tags?.map((tag) => {
            return {
              tag: {
                connectOrCreate: {
                  where: {
                    name: tag,
                  },
                  create: {
                    name: tag,
                  },
                },
              },
            };
          }),
        },
      },
    });

    const repository = this.getRepositoryByType(type);
    const typedPost = await (repository.create as any)({
      data: {
        post: {
          connect: {
            id: newPost.id,
          },
        },
        ...post,
      },
    });

    return ResultPostEntity.fromObject({
      ...newPost,
      ...typedPost,
    });
  }

  public async deleteById(id: string) {
    return await this.postRepository.delete({ where: { id } });
  }

  public async update<T extends PostEntity>(basePost: BasePostEntity, post?: T) {
    await this.tagRepository.detachTagsFromPosts(basePost.id!);

    const updatedPost = await this.postRepository.update({
      where: {
        id: basePost.id,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      data: {
        authorId: basePost.authorId,
        updatedAt: basePost.updatedAt,
        status: basePost.status,
        type: basePost.type,
        likesCount: basePost.likesCount,
        commentsCount: basePost.commentsCount,
        tags: {
          create: basePost.tags!.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: {
                  name: tag,
                },
                create: { name: tag },
              },
            },
          })),
        },
      },
    });

    if (!post) {
      return ResultPostEntity.fromObject({
        ...updatedPost,
        tags: updatedPost.tags.map((tag) => tag.tag.name),
      } as ResultingPost);
    }

    const repository = this.getRepositoryByType(basePost.type);
    const typedPost = await (repository.update as any)({
      where: { postId: basePost.id },
      data: post,
    });

    return ResultPostEntity.fromObject({
      ...updatedPost,
      ...typedPost,
      tags: updatedPost.tags.map((tag) => tag.tag.name),
    });
  }

  public async getPosts(count: number, offset: number, filterOption: filterOptions) {
    const orderBy: Prisma.PostOrderByWithAggregationInput = {};

    switch (filterOption) {
      case filterOptions.Like:
        orderBy.likesCount = 'desc';
        break;
      case filterOptions.Popular:
        orderBy.commentsCount = 'desc';
        break;
      default:
        orderBy.createdAt = 'desc';
        break;
    }

    const posts = await this.postRepository.findMany({
      orderBy,
      take: count,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      skip: offset,
    });

    return await Promise.all(
      posts.map(async (post) => {
        const repository = this.getRepositoryByType(post.type as PostType);
        const typedPost = await (repository.findFirst as any)({ where: { postId: post.id } });

        return ResultPostEntity.fromObject({
          ...post,
          ...typedPost,
          tags: post.tags.map((tag) => tag.tag.name),
        });
      })
    );
  }

  private getRepositoryByType<T extends PostType>(type: T) {
    switch (type) {
      case PostType.Video:
        return this.videoPostRepository;
      case PostType.Text:
        return this.textPostRepository;
      case PostType.Link:
        return this.linkPostRepository;
      case PostType.Image:
        return this.imagePostRepository;
      case PostType.Quote:
        return this.quotePostRepository;
      default:
        throw new Error('Invalid post type');
    }
  }
}
