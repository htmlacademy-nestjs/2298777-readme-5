import { Injectable } from '@nestjs/common';
import {
  ImagePostRepository,
  LinkPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
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
    private readonly imagePostRepository: ImagePostRepository
  ) {}

  public async findById(id: string) {
    const repositories = [
      this.videoPostRepository,
      this.linkPostRepository,
      this.quotePostRepository,
      this.textPostRepository,
      this.imagePostRepository,
    ];

    for (const repository of repositories) {
      const entity = await repository.findById(id);
      if (entity) {
        return entity;
      }
    }

    return null;
  }

  public async save<T extends PostEntity>(post: T, type: PostType) {
    const repository = this.getRepositoryByType(type);
    return await repository.save(post as any);
  }

  public async deleteById(id: string, type: PostType) {
    const repository = this.getRepositoryByType(type);
    return await repository.deleteById(id);
  }

  public async update<T extends PostEntity>(post: T, type: PostType) {
    const repository = this.getRepositoryByType(type);
    return await repository.updateById(post.id, post as any);
  }

  public async getPosts() {
    const repositories = [
      this.videoPostRepository,
      this.linkPostRepository,
      this.quotePostRepository,
      this.textPostRepository,
      this.imagePostRepository,
    ];

    const result: PostEntity[] = [];

    for (const repository of repositories) {
      const entities = await repository.getPosts();
      result.push(...entities);
    }

    return result;
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
