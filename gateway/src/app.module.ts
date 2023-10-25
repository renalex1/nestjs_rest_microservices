import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';

const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const envFilePath = join(__dirname, `../../${fileName}.env`);
const ENV = config({ path: envFilePath }).parsed;

@Module({
  imports: [
    ClientsModule.register([
      { name: 'COMMUNICATION', transport: Transport.TCP },
      {
        name: 'ANALYTICS',
        transport: Transport.TCP,
        options: { port: +ENV.ANALYTICS_PORT || 3001 },
      },
      {
        name: 'POSTS',
        transport: Transport.TCP,
        options: { port: +ENV.POSTS_PORT || 3001 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
