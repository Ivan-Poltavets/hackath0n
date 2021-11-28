import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { RegisterUserDTO } from 'src/dtos';
import { JwtAuthGuard, LocalAuthGuard } from 'src/guards';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  async protected(@Request() req) {
    // return 'some protected info' + req.user;
    return 'some protected info';
  }

  @Post('register')
  async registerUser(@Body() registerUserDTO: RegisterUserDTO) {
    return this.userService.registerUser(registerUserDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req) {
    console.log({ user: req.user });
    return this.userService.loginUser(req.user);
  }
}
