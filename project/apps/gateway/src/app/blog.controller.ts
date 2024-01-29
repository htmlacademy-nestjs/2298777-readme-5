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
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PostType, Subscribe } from '@project/shared/types';
import type { PostDto } from './types/post-dto.type';
import { AppServiceURL } from './app.config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import 'multer';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { RequestWithUser } from './request.type';

@ApiTags('blog')
@UseFilters(AxiosExceptionFilter)
@Controller('blog')
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post have been successfully created',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post(':type')
  public async create(
    @Param('type') type: PostType,
    @Body() post: PostDto,
    @Req() req: RequestWithUser
  ) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.Blog}/${type}`, {
      ...post,
      authorId: req.user!.id,
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched subscribed posts',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get('subscribed')
  public async getSubscribedPosts(
    @Query()
    query: {
      next?: number;
      quantity?: number;
      filter?: string;
    },
    @Req() req: RequestWithUser
  ) {
    const subscribed = await this.httpService.axiosRef.get(
      `${AppServiceURL.Subscribe}/subscribed/${req.user!.id}`
    );
    const authorIds = subscribed.data.map((author: Subscribe) => author.id) as string[];
    const { next, quantity, filter } = query;
    authorIds.push(req.user!.id!);
    const authorsIdsQuery = authorIds.map((id: string) => `authorIds[]=${id}`).join('&');
    const { data } = await this.httpService.axiosRef.get(
      `${AppServiceURL.Blog}/subscribed/?${authorsIdsQuery}&next=${next}&quantity=${quantity}&filter=${filter}`
    );
    return data;
  }

  @Get('search')
  public async findPostsByWords(
    @Query() { words, next, quantity }: { words?: string[]; next?: number; quantity?: number }
  ) {
    const wordsQuery = words?.map((word) => `words[]=${word}`).join('&');
    const { data } = await this.httpService.axiosRef.get(
      `${AppServiceURL.Blog}/search/?${wordsQuery}&next=${next}&quantity=${quantity}`
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully changed',
  })
  @Get(':id')
  public async getPost(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${AppServiceURL.Blog}/${id}`);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully updated',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch(':id')
  public async updatePost(@Param('id') id: string, @Body() post: any, @Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.patch(
      `${AppServiceURL.Blog}/${id}`,
      { ...post, authorId: req.user?.id },
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully deleted',
  })
  @UseGuards(CheckAuthGuard)
  @Delete(':id')
  public async deletePost(@Param('id') id: string, @Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.delete(`${AppServiceURL.Blog}/${id}`, {
      headers: { 'X-Author-Id': req.user?.id },
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post have been successfully changed',
  })
  @UseGuards(CheckAuthGuard)
  @Post('like/:id')
  public async like(@Param('id') id: string, @Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.Blog}/like/${id}`, {
      authorId: req.user?.id,
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts have been successfully fetched',
  })
  @Get()
  public async filter(
    @Query() query: { filter: string; quantity?: number; next?: number; tags?: string[] }
  ) {
    const { filter, quantity, next, tags } = query;
    const tagsQuery = tags?.map((tag) => `tags[]=${tag}`).join('&');
    const { data } = await this.httpService.axiosRef.get(
      `${AppServiceURL.Blog}/?filter=${filter}&quantity=${quantity}&next=${next}&${tagsQuery}`
    );
    return data;
  }
}
