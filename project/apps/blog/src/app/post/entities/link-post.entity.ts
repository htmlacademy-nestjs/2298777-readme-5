import { LinkPost, PostStatus } from '@project/shared/types';
import { BasePostEntity } from './post.abstract.entity';

export class LinkPostEntity extends BasePostEntity implements LinkPost {
  public linkUrl: string;
  public description: string;

  constructor(post: LinkPost) {
    super(post);
    this.linkUrl = post.linkUrl;
    this.description = post.description;
  }

  public toPojo() {
    return {
      ...super.toPojo(),
      linkUrl: this.linkUrl,
      description: this.description,
    };
  }

  public update(updatePost: {
    tags?: string[];
    status?: PostStatus;
    linkUrl?: string;
    description?: string;
  }) {
    const { linkUrl, description } = updatePost;
    super.update(updatePost);
    linkUrl && (this.linkUrl = linkUrl);
    description && (this.description = description);
  }

  static fromObject(post: LinkPost) {
    return new LinkPostEntity(post);
  }
}
