import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors();

  //aplicamos validationpipe globalmente para validar los DTOs entrantes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina los campos que no están en el DTO
    forbidNonWhitelisted: true, // Lanza un error si se envían campos no permitidos
  }));

  const config = new DocumentBuilder()
    .setTitle('API App Nova')
    .setDescription('Esta es la documentación para la API de App Nova.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));