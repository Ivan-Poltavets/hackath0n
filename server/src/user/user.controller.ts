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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return this.userService.getMe(req.user);
  }
}
