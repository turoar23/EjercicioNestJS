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
import UpdateUserDto from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // Just for development
  @Get('allUsers')
  async getAllUsers() {
    return this.usersService.getAll();
  }
  // Return all the users that are active
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsersActive() {
    return await this.usersService.getsByActive();
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.usersService.getProfile(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateUser(@Request() req, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(req.user.username, user);
  }
}
