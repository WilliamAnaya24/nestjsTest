import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const port = parseInt(process.env.SERVER_PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    Logger.log(`Server running on port ${port}`);
  });
}
bootstrap();
