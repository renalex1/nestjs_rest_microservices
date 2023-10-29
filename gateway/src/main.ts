import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { join } from 'path';

const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const envFilePath = join(__dirname, `../../${fileName}.env`);
const ENV = config({ path: envFilePath }).parsed;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest.js Rest API Microservice')
    .setDescription('Nest.js Rest API Microservice Documentation')
    .setVersion('1.0.0')
    .addTag('RenAlex')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(ENV.GATEWAY_PORT || 3000);

  console.log(`
  🚀 Nest.js REST API - Gateway - , launched at http://${ENV.GATEWAY_HOST}:${ENV.GATEWAY_PORT}`);
}
bootstrap();
