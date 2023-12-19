import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    required: true,
    example: '12345678',
    type: String,
    description: 'Old password',
  })
  public oldPassword: string;

  @ApiProperty({
    required: true,
    example: '987654321',
    type: String,
    description: 'New password',
  })
  public newPassword: string;
}
