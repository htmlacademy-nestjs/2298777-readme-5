import { TextPost } from '@project/shared/types';
import { BasePostEntity } from './post.abstract.entity';

export class TextPostEntity extends BasePostEntity implements TextPost {
  public name: string;
  public anonsText: string;
  public text: string;

  constructor(post: TextPost) {
    super(post);
    this.name = post.name;
    this.anonsText = post.anonsText;
    this.text = post.text;
  }

  public toPojo() {
    return {
      ...super.toPojo(),
      name: this.name,
      anonsText: this.anonsText,
      text: this.text,
    };
  }
}
