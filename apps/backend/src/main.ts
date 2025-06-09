// apps/backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // 启用 CORS，允许所有来源的请求
  // 在 NestFactory.create 之后，app.listen 之前调用
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();