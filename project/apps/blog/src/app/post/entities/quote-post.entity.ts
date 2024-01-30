import { QuotePost } from '@project/shared/types';

export class QuotePostEntity implements QuotePost {
  public quote: string;
  public quoteAuthor: string;

  constructor(post: QuotePost) {
    this.quote = post.quote;
    this.quoteAuthor = post.quoteAuthor;
  }

  static fromObject(post: QuotePost) {
    return new QuotePostEntity(post);
  }
}
