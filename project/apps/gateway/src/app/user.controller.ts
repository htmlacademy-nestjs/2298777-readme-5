import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginUserDto } from './dto/loggin-user.dto';
import { AppServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('auth')
@UseFilters(AxiosExceptionFilter)
@Controller('auth')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() loginData: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.User}/login`, loginData);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get new access token',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.User}/refresh`, null, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated',
  })
  @HttpCode(HttpStatus.OK)
  @Put()
  public async updatePassword(@Req() req: Request, @Body() dto: UpdatePasswordDto) {
    const { data } = await this.httpService.axiosRef.put(`${AppServiceURL.User}`, dto, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully fetched',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with this id does not exist',
  })
  @Get(':id')
  public async getUser(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${AppServiceURL.User}/${id}`, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }
}
