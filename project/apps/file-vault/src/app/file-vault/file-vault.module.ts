import { Module } from '@nestjs/common';
import { FileVaultController } from './file-vault.controller';
import { FileVaultService } from './file-vault.service';
import { FileVaultRepository } from './file-vault.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FileVaultModel, FileVaultSchema } from './file-vault.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { fileRepositoryToken } from './file-repo.token';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileVaultModel.name, schema: FileVaultSchema }]),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('app.uploadDir');
        return [
          {
            rootPath,
            serveRoot: '/static',
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
  ],
  controllers: [FileVaultController],
  providers: [
    FileVaultService,
    {
      provide: fileRepositoryToken,
      useClass: FileVaultRepository,
    },
  ],
  exports: [FileVaultService, fileRepositoryToken],
})
export class FileVaultModule {}
