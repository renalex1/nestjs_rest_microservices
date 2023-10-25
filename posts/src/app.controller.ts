import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { CreatePostEvent } from './event/create-post.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('post_created')
  handelPostCreated(data: CreatePostEvent) {
    this.appService.handelPostCreated(data);
  }
}
