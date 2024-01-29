import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MongoIdValidationPipe } from '@project/shared/pipes';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { RabbitRouting, RequestWithTokenPayload, TokenPayload } from '@project/shared/types';
import { NotifyService } from '../notify/notify.service';
import { UserEntity } from '../user/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LoginUserRdo } from './rdo/login-user.rdo';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

interface RequestWithUser {
  user?: UserEntity;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService
  ) {}

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
    await this.notifyService.registerSubscriber({
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });
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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user!);
    return fillDto(LoginUserRdo, { ...user?.toPojo(), ...userToken });
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get new access token',
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user!);
  }

  @UseGuards(JWTAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @RabbitSubscribe({
    exchange: 'readme.user.income',
    routingKey: RabbitRouting.Subscribe,
    queue: 'readme.user.income',
  })
  public async subscribe({
    authorId,
    userId,
    method,
  }: {
    authorId: string;
    userId: string;
    method: string;
  }) {
    await this.authService.subscribeHandle(authorId, userId, method);
  }

  @RabbitSubscribe({
    exchange: 'readme.user.income',
    routingKey: RabbitRouting.Post,
    queue: 'readme.user.income',
  })
  public async post({ authorId, method }: { authorId: string; method: string }) {
    await this.authService.postHandle(authorId, method);
  }
}
