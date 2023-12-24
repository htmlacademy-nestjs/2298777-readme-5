import { ImagePost, PostStatus } from '@project/shared/types';
import { BasePostEntity } from './post.abstract.entity';

export class ImagePostEntity extends BasePostEntity implements ImagePost {
  public imageUrl: string;

  constructor(post: ImagePost) {
    super(post);
    this.imageUrl = post.imageUrl;
  }

  public toPojo() {
    return {
      ...super.toPojo(),
      imageUrl: this.imageUrl,
    };
  }

  public update(updatePost: { tags?: string[]; status?: PostStatus; imageUrl?: string }) {
    const { imageUrl } = updatePost;
    super.update(updatePost);
    imageUrl && (this.imageUrl = imageUrl);
  }

  static fromObject(obj: ImagePost) {
    return new ImagePostEntity(obj);
  }
}
