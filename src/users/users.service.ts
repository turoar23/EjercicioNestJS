import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByEmail(username: string) {
    const user = await this.usersRepository.findOne({ username });
    // Check if the user was found with that email
    if (user) return user;
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getProfile(username: string) {
    const user = await this.getByEmail(username);
    user.password = undefined;
    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    newUser.active = true; // By default is true
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(username: string, userData: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ username });
    userData.password = await bcrypt.hash(userData.password, 10);
    await this.usersRepository.update(user.id, userData);
    const updatedUser = await this.usersRepository.findOne({ username });
    if (updatedUser) {
      updatedUser.password = undefined;
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getAll() {
    return this.usersRepository.find();
  }
  async getsByActive() {
    const users = await this.usersRepository.find({ active: true });
    return users;
  }
}
