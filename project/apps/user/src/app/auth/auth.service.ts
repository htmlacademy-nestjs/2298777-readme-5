import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser, Token, TokenPayload } from '@project/shared/types';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailFinderRepository } from '@project/shared/core';
import { UserRepositoryToken } from '../user/user.token';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'shared/config/src/lib/jwt/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: EmailFinderRepository<UserEntity>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, password, firstName, lastName } = dto;

    const user: AuthUser = {
      email,
      firstName,
      lastName,
      avatar: '',
      publicationsCount: 0,
      subscribersCount: 0,
      passwordHash: '',
    };

    if (await this.userRepository.findByEmail(email)) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser = await new UserEntity(user).setPassword(password);

    return this.userRepository.save(newUser);
  }

  public async validateUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    return user;
  }

  public async updatePassword(id: string, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.userRepository.updateById(id, await user.setPassword(newPassword));
  }

  public async createUserToken(user: AuthUser): Promise<Token> {
    const payload: TokenPayload = {
      id: user.id!,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`Error while creating access token: ${(error as Error).message}`);
      throw new HttpException(
        'Error while creating access token',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    return user;
  }
}
