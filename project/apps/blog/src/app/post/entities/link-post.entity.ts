import { LinkPost } from '@project/shared/types';
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
}
