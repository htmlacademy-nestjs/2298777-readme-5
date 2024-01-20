import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/shared/utils';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MongoIdValidationPipe } from '@project/shared/pipes';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { TokenPayload } from '@project/shared/types';

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
    const userToken = await this.authService.createUserToken(newUser);
    return fillDto(UserRdo, { ...newUser.toPojo(), ...userToken });
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
    const userToken = await this.authService.createUserToken(user);
    return fillDto(UserRdo, { ...user.toPojo(), ...userToken });
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
  @UseGuards(JWTAuthGuard)
  @Get(':id')
  public async getUser(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toPojo());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully updated',
  })
  @UseGuards(JWTAuthGuard)
  @Put()
  public async updatePassword(@Req() req: Request, @Body() dto: UpdatePasswordDto) {
    const tokenPayload = req.user as TokenPayload;
    const user = await this.authService.updatePassword(tokenPayload.id, dto);
    return fillDto(UserRdo, user.toPojo());
  }
}
