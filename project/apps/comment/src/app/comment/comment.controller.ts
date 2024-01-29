import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillDto } from '@project/shared/utils';
import { CommentRdo } from './rdo/comment.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { NUMBER_OF_FETCHED_COMMENTS } from './comment.constant';
import { isNumber } from 'class-validator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments by post id',
  })
  @Get('post/:id')
  public async getCommentsByPostId(
    @Param('id') id: string,
    @Query() query: { next?: number; quantity?: number }
  ) {
    const { next, quantity } = query;
    const comments = await this.commentService.getCommentsByPostId(
      id,
      isNumber(next) ? +next : 0,
      isNumber(quantity) ? +quantity : NUMBER_OF_FETCHED_COMMENTS
    );
    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPojo())
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create comment',
  })
  @Post()
  public async createComment(@Body() comment: CreateCommentDto) {
    const newComment = await this.commentService.createComment(comment);
    return fillDto(CommentRdo, newComment!.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete comment',
  })
  @Delete(':id')
  public async deleteComment(@Param('id') id: string) {
    return await this.commentService.deleteComment(id);
  }
}
