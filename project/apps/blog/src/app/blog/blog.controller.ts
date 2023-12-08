import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { filterOptions } from './filter-option.enum';
import { fillDto } from '@project/shared/utils';
import { VideoPostDto, TextPostDto, QuotePostDto, ImagePostDto, LinkPostDto } from './dto';
import { PostRdo } from './rdo/post.rdo';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  public async filter(@Query() query: { filter: filterOptions; quantity: number }) {
    const { filter, quantity } = query;
    const result = await this.blogService.filter(filter, quantity);
    return fillDto(
      PostRdo,
      result.map((post) => post.toPojo())
    );
  }

  @Post('video')
  public async createVideo(@Body() post: VideoPostDto) {
    const newPost = await this.blogService.createVideo(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @Post('text')
  public async createText(@Body() post: TextPostDto) {
    const newPost = await this.blogService.createText(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @Post('quote')
  public async createQuote(@Body() post: QuotePostDto) {
    const newPost = await this.blogService.createQuote(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @Post('image')
  public async createImage(@Body() post: ImagePostDto) {
    const newPost = await this.blogService.createImage(post);
    console.log(newPost);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @Post('link')
  public async createLink(@Body() post: LinkPostDto) {
    const newPost = await this.blogService.createLink(post);
    return fillDto(PostRdo, newPost.toPojo());
  }

  @Post('like/:id')
  public async like(@Param('id') id: string) {
    const post = await this.blogService.likeHandle(id, '3123fsdf');
    return fillDto(PostRdo, post.toPojo());
  }

  @Get(':id')
  public async getPost(@Param('id') id: string) {
    const post = await this.blogService.getPost(id);
    return fillDto(PostRdo, post.toPojo());
  }
}
