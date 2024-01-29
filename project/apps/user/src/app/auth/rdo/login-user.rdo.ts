import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginUserRdo {
  @ApiProperty({
    description: 'User id',
    example: '5f9d88d2c4a9c3e9c4b5f3a7',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @Expose()
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @Expose()
  public lastName: string;

  @ApiProperty({
    description: 'User avatar',
    example: '',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User token',
    example: 'fdsfdsfds',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'User refresh token',
    example: 'fdsfdsfds',
  })
  @Expose()
  public refreshToken: string;
}
