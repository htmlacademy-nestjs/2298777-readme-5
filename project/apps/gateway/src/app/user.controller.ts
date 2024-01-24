import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginUserDto } from './dto/loggin-user.dto';
import { AppServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@UseFilters(AxiosExceptionFilter)
@Controller('auth')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  public async login(@Body() loginData: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.User}/login`, loginData);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.User}/refresh`, null, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }
}
