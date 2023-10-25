import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './dto/create-user-request';
import { CreateUserEvent } from './event/create-user.event';
import { CreatePostRequest } from './dto/create-post-request';
import { CreatePostEvent } from './event/create-post.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  private readonly posts: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
    @Inject('POSTS') private readonly postsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email, createUserRequest.password),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email, createUserRequest.password),
    );
  }

  createPost(createPostRequest: CreatePostRequest) {
    this.posts.push(createPostRequest);
    this.postsClient.emit(
      'post_created',
      new CreatePostEvent(
        createPostRequest.id,
        createPostRequest.title,
        createPostRequest.body,
        createPostRequest.authorId,
      ),
    );
    // this.analyticsClient.emit(
    //   'user_created',
    //   new CreateUserEvent(createUserRequest.email, createUserRequest.password),
    // );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
