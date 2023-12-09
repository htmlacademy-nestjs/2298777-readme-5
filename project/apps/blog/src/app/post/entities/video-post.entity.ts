import { PostStatus, VideoPost } from '@project/shared/types';
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

  public update(updatePost: {
    tags?: string[];
    status?: PostStatus;
    name?: string;
    videoUrl?: string;
  }) {
    const { name, videoUrl } = updatePost;
    super.update(updatePost);
    name && (this.name = name);
    videoUrl && (this.videoUrl = videoUrl);
  }
}
