import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  public lastName: string;
}
