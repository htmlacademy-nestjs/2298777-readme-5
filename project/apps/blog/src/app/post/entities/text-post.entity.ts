import { TextPost } from '@project/shared/types';

export class TextPostEntity implements TextPost {
  public name: string;
  public anonsText: string;
  public text: string;

  constructor(post: TextPost) {
    this.name = post.name;
    this.anonsText = post.anonsText;
    this.text = post.text;
  }

  public toPojo() {
    return {
      name: this.name,
      anonsText: this.anonsText,
      text: this.text,
    };
  }

  static fromObject(post: TextPost) {
    return new TextPostEntity(post);
  }
}
