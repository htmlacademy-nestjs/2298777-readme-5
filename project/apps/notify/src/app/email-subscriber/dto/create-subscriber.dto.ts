import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  public firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  public lastName: string;
}
