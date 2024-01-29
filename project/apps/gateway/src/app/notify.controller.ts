import { HttpService } from '@nestjs/axios';
import { Controller, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RequestWithUser } from './request.type';

@ApiTags('notify')
@UseFilters(AxiosExceptionFilter)
@Controller('notify')
export class NotifyController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @Post('activate')
  public async activateNotifications(@Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.Notify}/activate`, {
      email: req.user?.email,
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('deactivate')
  public async deactivateNotifications(@Req() req: RequestWithUser) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.Notify}/deactivate`, {
      email: req.user?.email,
    });
    return data;
  }
}
