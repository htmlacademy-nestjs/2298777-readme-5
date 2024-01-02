import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'User email',
    example: 'example@gmail.com',
  })
  @IsEmail({}, { message: 'Incorrect email' })
  public email: string;

  @ApiProperty({
    required: true,
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;

  @ApiProperty({
    required: true,
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  public firstName: string;

  @ApiProperty({
    required: true,
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  public lastName: string;
}
