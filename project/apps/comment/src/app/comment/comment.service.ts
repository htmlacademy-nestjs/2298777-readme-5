import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { NUMBER_OF_FETCHED_COMMENTS } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async getCommentsByPostId(postId: string, next: number) {
    const start = next * NUMBER_OF_FETCHED_COMMENTS;
    const end = start + NUMBER_OF_FETCHED_COMMENTS;
    const comments = await this.commentRepository.getCommentsByPostId(postId);
    return comments.slice(start, end);
  }

  public async createComment(comment: CreateCommentDto) {
    const commentEntity = new CommentEntity({
      ...comment,
      date: new Date(),
    });
    return await this.commentRepository.save(commentEntity);
  }

  public async deleteComment(id: string) {
    return await this.commentRepository.deleteById(id);
  }
}
