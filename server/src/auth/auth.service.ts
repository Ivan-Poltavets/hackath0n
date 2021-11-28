import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JWTAuthDTO, RegisterUserDTO } from 'src/dtos';

import { UserRepository } from 'src/repositories/user.repository';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { User } from '../entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async loginValidate(loginUserDTO: LoginUserDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(loginUserDTO.email);

    if (!user) {
      throw new UnauthorizedException({
        param: 'email',
        message: 'User with this email is not exists',
      });
    }

    const isValidPassword = bcrypt.compareSync(
      loginUserDTO.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException({
        param: 'password',
        message: 'Password is wrong, try another one',
      });
    }

    return user;
  }

  async registerValidate({ email }: RegisterUserDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new UnauthorizedException({
        param: 'email',
        message: 'User with this email is already exists',
      });
    }
  }

  async login(user: User): Promise<JWTAuthDTO> {
    return {
      access_token: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }
}
