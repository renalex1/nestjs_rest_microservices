import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateUserRequest } from './dto/create-user-request';
import { CreatePostRequest } from './dto/create-post-request';

@ApiTags('Gateway')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Test Gateway Microservice' })
  @ApiResponse({ status: 200, description: 'Hello World!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Creating user - Communication microservice' })
  @ApiResponse({ status: 200, type: CreateUserRequest })
  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.appService.createUser(createUserRequest);
  }

  @ApiOperation({ summary: 'Get analytics for users - Analytic microservice' })
  @ApiResponse({ status: 200, type: CreateUserRequest })
  @Get('analytics')
  getAnalytics() {
    return this.appService.getAnalytics();
  }

  @ApiOperation({ summary: 'Creating post - Post microservice' })
  @ApiResponse({ status: 200, type: CreatePostRequest })
  @Post('post')
  createPost(@Body() createPostRequest: CreatePostRequest) {
    this.appService.createPost(createPostRequest);
  }

  @ApiOperation({ summary: 'Get analytics for posts - Analytic microservice' })
  @ApiResponse({ status: 200, type: CreatePostRequest })
  @Get('analytics_posts')
  getAnalyticsPosts() {
    return this.appService.getAnalyticsPosts();
  }
}
