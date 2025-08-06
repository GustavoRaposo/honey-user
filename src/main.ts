import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // ou o endereço do seu frontend
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
