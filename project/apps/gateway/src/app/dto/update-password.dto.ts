import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    required: true,
    example: '12345678',
    type: String,
    description: 'Old password',
  })
  @IsString()
  public oldPassword: string;

  @ApiProperty({
    required: true,
    example: '987654321',
    type: String,
    description: 'New password',
  })
  @IsString()
  public newPassword: string;
}
