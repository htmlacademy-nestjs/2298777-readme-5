import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'User id',
    example: '5f9d88d2c4a9c3e9c4b5f3a7',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User avatar',
    example: '/images/avatars/1.png',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User register date',
    example: '2020-10-30T14:30:00.000Z',
  })
  @Expose()
  public registerDate: Date;

  @ApiProperty({
    description: 'User publications count',
    example: 0,
  })
  @Expose()
  public publicationsCount: number;

  @ApiProperty({
    description: 'User subscribers count',
    example: 0,
  })
  @Expose()
  public subscribersCount: number;
}
