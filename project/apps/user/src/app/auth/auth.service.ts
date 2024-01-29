import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser, Token } from '@project/shared/types';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailFinderRepository } from '@project/shared/core';
import { UserRepositoryToken } from '../user/user.token';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'shared/config/src/lib/jwt/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJwtPayload } from '@project/shared/utils';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: EmailFinderRepository<UserEntity>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
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
    const accessToken = createJwtPayload(user);
    const refreshTokenPayload = { ...accessToken, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshToken(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessToken),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    };
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    return user;
  }

  public async subscribeHandle(authorId: string, userId: string, method: string) {
    const author = await this.userRepository.findById(authorId);
    const user = await this.userRepository.findById(userId);

    if (!author || !user) {
      throw new NotFoundException('User with this id does not exist');
    }

    if (method === 'create') {
      author.subscribersCount += 1;
    } else if (method === 'delete') {
      author.subscribersCount -= 1;
    }

    return this.userRepository.updateById(authorId, author);
  }

  public async postHandle(userId: string, method: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }

    if (method === 'create') {
      user.publicationsCount += 1;
    } else if (method === 'delete') {
      user.publicationsCount -= 1;
    }

    return this.userRepository.updateById(userId, user);
  }
}
