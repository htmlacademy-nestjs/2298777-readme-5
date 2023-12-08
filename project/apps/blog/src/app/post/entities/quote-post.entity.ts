import { QuotePost } from '@project/shared/types';
import { BasePostEntity } from './post.abstract.entity';

export class QuotePostEntity extends BasePostEntity implements QuotePost {
  public quote: string;
  public quoteAuthor: string;

  constructor(post: QuotePost) {
    super(post);
    this.quote = post.quote;
    this.quoteAuthor = post.quoteAuthor;
  }

  public toPojo() {
    return {
      ...super.toPojo(),
      quote: this.quote,
      quoteAuthor: this.quoteAuthor,
    };
  }
}
