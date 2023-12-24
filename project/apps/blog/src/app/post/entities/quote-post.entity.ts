import { PostStatus, QuotePost } from '@project/shared/types';
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

  public update(updatePost: {
    tags?: string[];
    status?: PostStatus;
    quote?: string;
    quoteAuthor?: string;
  }) {
    const { quote, quoteAuthor } = updatePost;
    super.update(updatePost);
    quote && (this.quote = quote);
    quoteAuthor && (this.quoteAuthor = quoteAuthor);
  }

  static fromObject(post: QuotePost) {
    return new QuotePostEntity(post);
  }
}
