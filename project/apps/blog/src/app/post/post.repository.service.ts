import { Injectable } from '@nestjs/common';
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

@Injectable()
export class PostRepositoryService {
  constructor(
    private readonly videoPostRepository: VideoPostRepository,
    private readonly linkPostRepository: LinkPostRepository,
    private readonly quotePostRepository: QuotePostRepository,
    private readonly textPostRepository: TextPostRepository,
    private readonly imagePostRepository: ImagePostRepository,
    private readonly postRepository: PostRepository
  ) {}

  public async findById(id: string) {
    const post = await this.postRepository.findFirst({ where: { id } });

    if (!post) {
      return null;
    }

    const repository = this.getRepositoryByType(post.type as PostType);
    const typedPost = await (repository.findFirst as any)({ where: { postId: id } });

    return ResultPostEntity.fromObject({
      ...post,
      ...typedPost,
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
    const updatedPost = await this.postRepository.update({
      data: {
        authorId: basePost.authorId,
        updatedAt: basePost.updatedAt,
        status: basePost.status,
        type: basePost.type,
        likesCount: basePost.likesCount,
        commentsCount: basePost.commentsCount,
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
      where: {
        id: basePost.id,
      },
    });

    if (!post) {
      return ResultPostEntity.fromObject(updatedPost as ResultingPost);
    }

    const repository = this.getRepositoryByType(basePost.type);
    const typedPost = await (repository.update as any)({
      where: { postId: basePost.id },
      data: post,
    });

    return ResultPostEntity.fromObject({
      ...updatedPost,
      ...typedPost,
    });
  }

  public async getPosts(count: number, offset: number) {
    const posts = await this.postRepository.findMany({
      orderBy: { createdAt: 'desc' },
      take: count,
      skip: offset,
    });

    return await Promise.all(
      posts.map(async (post) => {
        const repository = this.getRepositoryByType(post.type as PostType);
        const typedPost = await (repository.findFirst as any)({ where: { postId: post.id } });

        return ResultPostEntity.fromObject({
          ...post,
          ...typedPost,
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
