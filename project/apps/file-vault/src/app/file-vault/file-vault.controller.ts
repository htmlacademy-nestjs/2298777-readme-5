import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { FileVaultService } from './file-vault.service';
import { CreateFileDto } from './dto/create-file.dto';
import { fillDto } from '@project/shared/utils';
import { FileRdo } from './rdo/file.rdo';
import { ApiResponse } from '@nestjs/swagger';

@Controller('file')
export class FileVaultController {
  constructor(private readonly fileVaultService: FileVaultService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The file has been successfully uploaded.',
  })
  @Post('upload')
  public async upload(@Body() file: CreateFileDto) {
    const newFile = await this.fileVaultService.upload(file);
    return fillDto(FileRdo, newFile.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The file has been successfully retrieved.',
  })
  @Get(':id')
  public async get(@Param('id') id: string) {
    const file = await this.fileVaultService.get(id);
    return fillDto(FileRdo, file.toPojo());
  }
}
