import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { AppServiceURL } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RequestWithUser } from './request.type';

@ApiTags('subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  @UseGuards(CheckAuthGuard)
  public async subscribe(@Body() body: { authorId: string }, @Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.Subscribe}`, {
      ...body,
      userId: req.user?.id,
    });
    return data;
  }

  @Delete(':authorId')
  @UseGuards(CheckAuthGuard)
  public async unsubscribe(@Param('authorId') authorId: string, @Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.delete(
      `${AppServiceURL.Subscribe}/${authorId}/${req.user?.id}`
    );
    return data;
  }

  @Get('subscribed')
  @UseGuards(CheckAuthGuard)
  public async findSubscribedAuthors(@Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.get(
      `${AppServiceURL.Subscribe}/subscribed/${req.user?.id}`
    );
    return data;
  }
}
