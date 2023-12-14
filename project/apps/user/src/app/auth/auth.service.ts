import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from '@project/shared/types';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, password, firstName, lastName } = dto;

    const user: AuthUser = {
      email,
      firstName,
      lastName,
      avatar: '',
      registerDate: new Date(),
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

    return user.toPojo();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
