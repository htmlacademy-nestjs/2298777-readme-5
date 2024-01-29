import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { rabbitConfig } from '@project/shared/config';
import { RabbitRouting } from '@project/shared/types';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async getCommentsByPostId(postId: string, next: number, quantity: number) {
    const start = next * quantity;
    const comments = await this.commentRepository.getCommentsByPostId(postId, quantity, start);
    return comments;
  }

  public async createComment(comment: CreateCommentDto) {
    const commentEntity = new CommentEntity({
      ...comment,
      createdAt: new Date(),
    });
    try {
      const newComment = await this.commentRepository.save(commentEntity);
      await this.rabbitClient.publish(this.rabbitOptions.exchange, RabbitRouting.Comment, {
        postId: newComment.postId,
        method: 'create',
      });
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
      await this.rabbitClient.publish(this.rabbitOptions.exchange, RabbitRouting.Comment, {
        postId: deletedComment.postId,
        method: 'delete',
      });
      return deletedComment;
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        throw new BadRequestException('Comment not found');
      }
    }
  }
}
