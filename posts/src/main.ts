import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';

const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const envFilePath = join(__dirname, `../../${fileName}.env`);
const ENV = config({ path: envFilePath }).parsed;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: ENV.POSTS_PORT || 3002,
    },
  });

  await app.startAllMicroservices();
  await app.listen(ENV.POSTS_PORT || 3001);

  console.log(`
  🚀 Nest.js REST Microservice - Posts - , launched at http://${ENV.POSTS_HOST}:${ENV.POSTS_PORT}`);
}
bootstrap();
