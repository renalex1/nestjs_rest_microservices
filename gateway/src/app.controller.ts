import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequest } from './dto/create-user-request';
import { CreatePostRequest } from './dto/create-post-request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.appService.createUser(createUserRequest);
  }

  @Get('analytics')
  getAnalytics() {
    return this.appService.getAnalytics();
  }

  @Post('post')
  createPost(@Body() createPostRequest: CreatePostRequest) {
    this.appService.createPost(createPostRequest);
  }

  @Get('analytics_posts')
  getAnalyticsPosts() {
    return this.appService.getAnalyticsPosts();
  }
}
