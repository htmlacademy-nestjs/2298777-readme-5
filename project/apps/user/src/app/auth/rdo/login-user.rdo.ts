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
    description: 'User name',
    example: 'John Doe',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'fdsfdsfds',
  })
  @Expose()
  public accessToken: string;
}
