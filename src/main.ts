import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Initializer } from './initializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  new Initializer(app).run();
}
bootstrap();
