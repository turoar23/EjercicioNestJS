import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }
  // @Get(':email')
  // getUser(@Param('email') email: string) {
  //   return this.usersService.getByEmail(email);
  // }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /*@Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }*/
  @Put(':email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(email, user);
  }
}
