import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PostType, User } from '@project/shared/types';
import type { PostDto } from './types/post-dto.type';
import { AppServiceURL } from './app.config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { Request } from 'express';
import 'multer';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

interface RequestWithUser extends Request {
  user?: User;
}

@ApiTags('blog')
@Controller('blog')
@UseFilters(AxiosExceptionFilter)
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
}
