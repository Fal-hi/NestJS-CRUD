import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3001;
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
