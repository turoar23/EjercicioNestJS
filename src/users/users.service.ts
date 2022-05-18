import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import User from './user.entity';

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

  async create(userData: CreateUserDto) {
    //TODO: check before if the user already exists
    // const userExist = await this.getByEmail(userData.username);
    // if (userExist)
    //   throw new HttpException(
    //     'User with that email already exists',
    //     HttpStatus.BAD_REQUEST,
    //   );
    const newUser = await this.usersRepository.create(userData);
    newUser.active = true;
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(email: string, userData: UpdateUserDto) {
    await this.usersRepository.update(email, userData);
    const updatedUser = await this.usersRepository.findOne(email);
    if (updatedUser) {
      updatedUser.password = undefined;
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getAll() {
    return this.usersRepository.find();
  }
}
