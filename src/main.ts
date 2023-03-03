import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  app.useGlobalPipes(new ValidationPipe());
  await app
    .listen(port)
    .then(() => {
      console.log(`successfully stared on port ${port}`);
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
