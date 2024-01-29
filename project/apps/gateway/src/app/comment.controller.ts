import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppServiceURL } from './app.config';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments by post id',
  })
  @Get('post/:id')
  public async getCommentsByPostId(
    @Param('id') id: string,
    @Query() query: { next?: number; quantity?: number }
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${AppServiceURL.Comment}/post/${id}/?next=${query.quantity}&quantity=${query.quantity}`
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create comment',
  })
  @Post()
  public async createComment(@Body() comment: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.Comment}`, comment);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete comment',
  })
  @Delete(':id')
  public async deleteComment(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${AppServiceURL.Comment}/${id}`);
    return data;
  }
}
