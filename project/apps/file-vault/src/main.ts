import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  const config = new DocumentBuilder()
    .setTitle('File Vault')
    .setDescription('The file vault API description')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);
  const port = app.get(ConfigService).get('app.port');
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
