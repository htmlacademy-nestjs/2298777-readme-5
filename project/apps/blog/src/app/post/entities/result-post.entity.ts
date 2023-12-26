import { ResultingPost } from '@project/shared/types';
import { BasePostEntity } from './base-post.entity';

export class ResultPostEntity extends BasePostEntity implements ResultingPost {
  public name?: string;
  public videoUrl?: string;
  public text?: string;
  public anonsText?: string;
  public quote?: string;
  public quoteAuthor?: string;
  public imageUrl?: string;
  public linkUrl?: string;
  public description?: string;

  constructor(post: ResultingPost) {
    super(post);
    this.name = post.name;
    this.videoUrl = post.videoUrl;
    this.text = post.text;
    this.anonsText = post.anonsText;
    this.quote = post.quote;
    this.quoteAuthor = post.quoteAuthor;
    this.imageUrl = post.imageUrl;
    this.linkUrl = post.linkUrl;
    this.description = post.description;
  }

  toPojo() {
    return {
      ...super.toPojo(),
      name: this.name,
      videoUrl: this.videoUrl,
      text: this.text,
      anonsText: this.anonsText,
      quote: this.quote,
      quoteAuthor: this.quoteAuthor,
      imageUrl: this.imageUrl,
      linkUrl: this.linkUrl,
      description: this.description,
    };
  }

  static fromObject(post: ResultingPost) {
    return new ResultPostEntity(post);
  }
}
