import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createMessageChannel } from './rabbitmq/rabbitmq.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(2000);
  await createMessageChannel()
}
bootstrap();
