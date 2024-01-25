import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FileController } from './file.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [BlogController, UserController, FileController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
