import { VideoPost } from '@project/shared/types';

export class VideoPostEntity implements VideoPost {
  public name: string;
  public videoUrl: string;

  constructor(post: VideoPost) {
    this.name = post.name;
    this.videoUrl = post.videoUrl;
  }

  static fromObject(post: VideoPost) {
    return new VideoPostEntity(post);
  }
}
