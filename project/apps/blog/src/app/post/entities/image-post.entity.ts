import { ImagePost } from '@project/shared/types';

export class ImagePostEntity implements ImagePost {
  public imageUrl: string;

  constructor(post: ImagePost) {
    this.imageUrl = post.imageUrl;
  }

  static fromObject(obj: ImagePost) {
    return new ImagePostEntity(obj);
  }
}
