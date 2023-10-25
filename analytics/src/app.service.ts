import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './event/create-user.event';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];

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
}
