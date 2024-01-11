import { LinkPost } from '@project/shared/types';

export class LinkPostEntity implements LinkPost {
  public linkUrl: string;
  public description: string;

  constructor(post: LinkPost) {
    this.linkUrl = post.linkUrl;
    this.description = post.description;
  }

  public toPojo() {
    return {
      linkUrl: this.linkUrl,
      description: this.description,
    };
  }

  static fromObject(post: LinkPost) {
    return new LinkPostEntity(post);
  }
}
