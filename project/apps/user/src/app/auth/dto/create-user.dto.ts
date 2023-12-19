import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'User email',
    example: 'example@gmail.com',
  })
  public email: string;

  @ApiProperty({
    required: true,
    description: 'User password',
    example: '123456',
  })
  public password: string;

  @ApiProperty({
    required: true,
    description: 'User first name',
    example: 'John',
  })
  public firstName: string;

  @ApiProperty({
    required: true,
    description: 'User last name',
    example: 'Doe',
  })
  public lastName: string;
}
