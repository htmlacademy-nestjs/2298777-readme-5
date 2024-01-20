import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { NUMBER_OF_FETCHED_COMMENTS } from './comment.constant';
import { Err } from 'joi';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async getCommentsByPostId(postId: string, next: number) {
    const start = next * NUMBER_OF_FETCHED_COMMENTS;
    const comments = await this.commentRepository.getCommentsByPostId(
      postId,
      NUMBER_OF_FETCHED_COMMENTS,
      start
    );
    return comments;
  }

  public async createComment(comment: CreateCommentDto) {
    const commentEntity = new CommentEntity({
      ...comment,
      createdAt: new Date(),
    });
    try {
      const newComment = await this.commentRepository.save(commentEntity);
      return newComment;
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('Foreign key')) {
        throw new BadRequestException('Post not found');
      }
    }
  }

  public async deleteComment(id: string) {
    try {
      const deletedComment = await this.commentRepository.deleteById(id);
      return deletedComment;
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        throw new BadRequestException('Comment not found');
      }
    }
  }
}
