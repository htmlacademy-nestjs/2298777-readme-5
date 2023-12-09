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
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { filterOptions } from './filter-option.enum';
import { fillDto } from '@project/shared/utils';
import {
  VideoPostDto,
  TextPostDto,
  QuotePostDto,
  ImagePostDto,
  LinkPostDto,
  UpdatePostDto,
} from './dto';
import { PostRdo } from './rdo/post.rdo';
import { ApiResponse } from '@nestjs/swagger';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts have been successfully fetched',
  })
  @Get()
  public async filter(@Query() query: { filter: filterOptions; quantity: number }) {
    const { filter, quantity } = query;
    const result = await this.blogService.filter(filter, quantity);
    return fillDto(
      PostRdo,
      result.map((post) => post.toPojo())
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post have been successfully created',
  })
  @Post('video')
  public async createVideo(@Body() post: VideoPostDto) {
    post.type = 'video';
    const newPost = await this.blogService.createPost(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post have been successfully created',
  })
  @Post('text')
  public async createText(@Body() post: TextPostDto) {
    post.type = 'text';
    const newPost = await this.blogService.createPost(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post have been successfully created',
  })
  @Post('quote')
  public async createQuote(@Body() post: QuotePostDto) {
    post.type = 'quote';
    const newPost = await this.blogService.createPost(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post have been successfully created',
  })
  @Post('image')
  public async createImage(@Body() post: ImagePostDto) {
    post.type = 'image';
    const newPost = await this.blogService.createPost(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post have been successfully created',
  })
  @Post('link')
  public async createLink(@Body() post: LinkPostDto) {
    post.type = 'link';
    const newPost = await this.blogService.createPost(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully changed',
  })
  @Post('like/:id')
  public async like(@Param('id') id: string) {
    const post = await this.blogService.likeHandle(id, '3123fsdf');
    return fillDto(PostRdo, post.toPojo());
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
  public async deletePost(@Param('id') id: string) {
    await this.blogService.deletePost(id);
    return 'successfully deleted';
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
}
