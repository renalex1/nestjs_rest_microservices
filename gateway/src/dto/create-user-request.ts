import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty({ example: 'user@gmail.com', description: 'Uniq email' })
  email: string;

  @ApiProperty({ example: '121322321', description: 'password' })
  password: string;
}
