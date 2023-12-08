import { VideoPost } from '@project/shared/types';
import { BasePostEntity } from './post.abstract.entity';

export class VideoPostEntity extends BasePostEntity implements VideoPost {
  public name: string;
  public videoUrl: string;

  constructor(post: VideoPost) {
    super(post);
    this.name = post.name;
    this.videoUrl = post.videoUrl;
  }

  public toPojo() {
    return {
      ...super.toPojo(),
      name: this.name,
      videoUrl: this.videoUrl,
    };
  }
}
