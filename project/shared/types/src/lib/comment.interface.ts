export interface Comment {
  id?: string;
  text: string;
  createdAt: Date;
  authorId: string;
  postId: string;
}
