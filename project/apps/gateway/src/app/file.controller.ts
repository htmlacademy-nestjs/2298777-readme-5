import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { AppServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { toFormData } from 'axios';

@ApiTags('file')
@Controller('file')
@UseFilters(AxiosExceptionFilter)
export class FileController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The file has been successfully uploaded.',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: Express.Multer.File) {
    const formData = toFormData(file);
    formData.append('file', file.buffer, { filename: file.originalname });
    const { data } = await this.httpService.axiosRef.post(`${AppServiceURL.File}/upload`, formData);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The file has been successfully retrieved.',
  })
  @Get(':id')
  public async get(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${AppServiceURL.File}/${id}`);
    return data;
  }
}
