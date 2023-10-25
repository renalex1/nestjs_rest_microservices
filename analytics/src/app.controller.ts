import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from './event/create-user.event';
import { CreatePostEvent } from './event/create-post.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  handelUserCreated(data: CreateUserEvent) {
    this.appService.handelUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    return this.appService.getAnalytics();
  }

  @EventPattern('post_created')
  handelPostCreated(data: CreatePostEvent) {
    this.appService.handelPostCreated(data);
  }

  @MessagePattern({ cmd: 'get_analytics_posts' })
  getAnalyticsPosts() {
    return this.appService.getAnalyticsPosts();
  }
}
