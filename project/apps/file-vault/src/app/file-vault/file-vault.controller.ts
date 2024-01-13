import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileVaultService } from './file-vault.service';
import { fillDto } from '@project/shared/utils';
import { FileRdo } from './rdo/file.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MongoIdValidationPipe } from '@project/shared/pipes';
import 'multer';

@Controller('file')
export class FileVaultController {
  constructor(private readonly fileVaultService: FileVaultService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The file has been successfully uploaded.',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileVaultService.saveFile(file);
    return fillDto(FileRdo, newFile.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The file has been successfully retrieved.',
  })
  @Get(':id')
  public async get(@Param('id', MongoIdValidationPipe) id: string) {
    const file = await this.fileVaultService.get(id);
    return fillDto(FileRdo, file.toPojo());
  }
}
