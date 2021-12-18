import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AuthService } from 'src/auth/auth.service';
import { JWTAuthDTO, JWTPayloadDTO, RegisterUserDTO } from 'src/dtos';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async loginUser(user: User): Promise<JWTAuthDTO> {
    return this.authService.login(user);
  }

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<JWTAuthDTO> {
    await this.authService.registerValidate(registerUserDTO);
    const hashPassword = bcrypt.hashSync(registerUserDTO.password, 8);

    const user = await this.userRepository.add({
      ...registerUserDTO,
      password: hashPassword,
    });

    return this.authService.login(user);
  }

  async getMe(user: JWTPayloadDTO): Promise<User> {
    return this.userRepository.findUserById(user);
  }
}
