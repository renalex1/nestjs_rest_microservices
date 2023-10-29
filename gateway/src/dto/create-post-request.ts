import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRequest {
  @ApiProperty({ example: '1', description: 'Uniq id' })
  id: number;

  @ApiProperty({ example: 'My new car', description: 'Title for new post' })
  title: string;

  @ApiProperty({
    example: 'Some description',
    description: 'Description for new post',
  })
  body: string;

  @ApiProperty({
    example: 'UserId is #1',
    description: 'User id which created post',
  })
  authorId: string;
}
