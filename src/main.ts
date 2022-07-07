import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Rose Finance')
    .setDescription('Rose Finance API')
    .setVersion('1.0')
    .addTag('ROSE_BAY')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(7000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
