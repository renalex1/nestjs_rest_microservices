import { Injectable } from '@nestjs/common';
import { CreatePostEvent } from './event/create-post.event';

@Injectable()
export class AppService {
  private readonly posts: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handelPostCreated(data: CreatePostEvent) {
    console.log('handelPostCreated - POSTS ', data);

    this.posts.push({
      id: data.id,
      title: data.title,
      body: data.body,
      authorId: data.authorId,
    });
  }
}
