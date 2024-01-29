import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gateway service')
    .setDescription('Gateway API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalInterceptors(new RequestIdInterceptor());

  const port = app.get(ConfigService).get('app.port');
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
