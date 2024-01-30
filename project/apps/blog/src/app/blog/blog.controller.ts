import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { filterOptions } from './filter-option.enum';
import { fillDto } from '@project/shared/utils';
import { UpdatePostDto } from './dto';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostType, RabbitRouting } from '@project/shared/types';
import { DEFAULT_FETCHED_POSTS, DEFAULT_FETCHED_SEARCH_POSTS } from './blog.const';
import { PostDto } from './blog.types';
import { Request } from 'express';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MongoIdValidationPipe } from '@project/shared/pipes';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts have been successfully fetched',
  })
  @Get()
  public async filter(
    @Query() query: { filter?: filterOptions; quantity?: number; next?: number; tags?: string[] }
  ) {
    const { filter, quantity, next, tags } = query;
    const result = await this.blogService.filter(
      filter ? filter : filterOptions.Date,
      isNaN(+quantity!) ? DEFAULT_FETCHED_POSTS : +quantity!,
      isNaN(+next!) ? 0 : +next!,
      tags ? tags : []
    );
    return fillDto(
      PostRdo,
      result.map((post) => post.toPojo())
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post have been successfully created',
  })
  @Post(':type')
  public async createPostByType(@Param('type') type: PostType, @Body() post: PostDto) {
    post.type = type;
    const newPost = await this.blogService.createPost(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully changed',
  })
  @Post('like/:id')
  public async like(@Param('id') id: string, @Body() body: { authorId: string }) {
    const post = await this.blogService.likeHandle(id, body.authorId);
    return fillDto(PostRdo, post.toPojo());
  }

  @Get('search')
  public async findPostsByWords(
    @Query() { words, next, quantity }: { words?: string[]; next?: number; quantity?: number }
  ) {
    const posts = await this.blogService.findPostsByWords(
      words ? words : [],
      isNaN(+next!) ? 0 : +next!,
      isNaN(+quantity!) ? DEFAULT_FETCHED_SEARCH_POSTS : +quantity!
    );
    return fillDto(
      PostRdo,
      posts.map((post) => post.toPojo())
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched subscribed posts',
  })
  @Get('subscribed')
  public async getSubscribedPosts(
    @Query()
    query: {
      authorIds: string[];
      next?: number;
      quantity?: number;
      filter?: filterOptions;
    }
  ) {
    const { authorIds, next, quantity, filter } = query;
    const result = await this.blogService.getSubscribedPosts(
      authorIds,
      isNaN(+next!) ? 0 : +next!,
      isNaN(+quantity!) ? DEFAULT_FETCHED_POSTS : +quantity!,
      filter ? filter : filterOptions.Date
    );
    return fillDto(
      PostRdo,
      result.map((post) => post.toPojo())
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully changed',
  })
  @Get(':id')
  public async getPost(@Param('id') id: string) {
    const post = await this.blogService.getPost(id);
    return fillDto(PostRdo, post.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully deleted',
  })
  @Delete(':id')
  public async deletePost(@Param('id') id: string, @Req() req: Request) {
    await this.blogService.deletePost(id, req.headers['x-author-id'] as string);
    return 'successfully deleted';
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully changed',
  })
  @Patch('repost')
  public async repost(@Body() body: { postId: string; authorId: string }) {
    const post = await this.blogService.repost(body.postId, body.authorId);
    return fillDto(PostRdo, post.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully updated',
  })
  @Patch(':id')
  public async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    const updatedPost = await this.blogService.updatePost(id, post);
    return fillDto(PostRdo, updatedPost.toPojo());
  }

  @RabbitSubscribe({
    exchange: 'readme.comment.income',
    routingKey: RabbitRouting.Comment,
    queue: 'readme.comment.income',
  })
  public async commentHandle({ postId, method }: { postId: string; method: string }) {
    if (method === 'create') {
      await this.blogService.increaseCommentsCount(postId);
    } else {
      await this.blogService.decreaseCommentsCount(postId);
    }
  }
}
