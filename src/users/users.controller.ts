import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }
  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
