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
import { PostType } from '@project/shared/types';

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

    return repository.makeEntityFromObject(typedPost);
  }

  public async save<T extends PostEntity>(post: T, type: PostType) {
    this.postRepository.create(post as any);
    const repository = this.getRepositoryByType(type);
    return await (repository.create as any)(post as any);
  }

  public async deleteById(id: string, type: PostType) {
    await this.postRepository.delete({ where: { id } });
    const repository = this.getRepositoryByType(type);
    return await (repository.delete as any)({ where: { postId: id } });
  }

  public async update<T extends PostEntity>(post: T, type: PostType) {
    this.postRepository.update(post as any);
    const repository = this.getRepositoryByType(type);
    return await (repository.update as any)({ where: { postId: post.id }, data: post });
  }

  public async getPosts() {
    const posts = await this.postRepository.findMany({ orderBy: { createdAt: 'desc' } });

    return await Promise.all(
      posts.map(async (post) => {
        const repository = this.getRepositoryByType(post.type as PostType);
        const typedPost = await (repository.findFirst as any)({ where: { postId: post.id } });

        return repository.makeEntityFromObject(typedPost);
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
