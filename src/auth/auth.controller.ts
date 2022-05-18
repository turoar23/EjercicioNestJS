import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('register')
  async createUser(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
