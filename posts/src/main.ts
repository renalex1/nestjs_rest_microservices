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
      port: ENV.ANALYTICS_PORT || 3001,
    },
  });

  await app.startAllMicroservices();
  await app.listen(ENV.ANALYTICS_PORT || 3001);

  console.log(`
  🚀 Nest.js REST Microservice - Analytics - , launched at http://${ENV.ANALYTICS_HOST}:${ENV.ANALYTICS_PORT}`);
}
bootstrap();
