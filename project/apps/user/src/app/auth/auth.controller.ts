import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/shared/utils';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been successfully registered',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists',
  })
  @Post('register')
  public async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toPojo());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.validateUser(dto);
    return fillDto(UserRdo, user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully fetched',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with this id does not exist',
  })
  @Get(':id')
  public async getUser(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toPojo());
  }
}
