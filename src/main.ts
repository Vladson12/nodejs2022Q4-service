import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist';
import { resolve } from 'path';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();
  const configService: ConfigService = app.get(ConfigService);

  const inputFilePath = resolve(__dirname, '..', 'doc', 'api.yaml');
  const objDoc = load(readFileSync(inputFilePath, { encoding: 'utf-8' }));
  SwaggerModule.setup('api', app, objDoc as OpenAPIObject);

  await app.listen(configService.get('PORT') || 4000);
}
bootstrap();
