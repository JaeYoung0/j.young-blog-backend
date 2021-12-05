import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Hinu API')
    .setDescription('Hinu Blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

export default swagger;
