import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './event/create-user.event';
import { CreatePostEvent } from './event/create-post.event';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];
  private readonly analyticsPosts: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handelUserCreated(data: CreateUserEvent) {
    console.log('handelUserCreated - ANALYTICS ', data);

    this.analytics.push({
      email: data.email,
      password: data.password,
      timestamp: new Date(),
    });
  }

  getAnalytics() {
    return this.analytics;
  }

  handelPostCreated(data: CreatePostEvent) {
    console.log('handelPostCreated - ANALYTICS ', data);

    this.analyticsPosts.push({
      id: data.id,
      title: data.title,
      body: data.body,
      authorId: data.authorId,
      timestamp: new Date(),
    });
  }

  getAnalyticsPosts() {
    return this.analyticsPosts;
  }
}
