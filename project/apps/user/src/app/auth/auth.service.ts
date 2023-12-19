import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from '@project/shared/types';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailFinderRepository } from '@project/shared/core';
import { UserRepositoryToken } from '../user/user.token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: EmailFinderRepository<UserEntity>
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
}
