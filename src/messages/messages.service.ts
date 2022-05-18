import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import CreateMessageDto from './dto/createMessage.dto';
import Message from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private usersService: UsersService,
  ) {}

  async sendMessage(sender: string, newMessage: CreateMessageDto) {
    const userSender = await this.usersService.getByEmail(sender);
    const userReciever = await this.usersService.getByEmail(newMessage.to);

    // TODO: diferenciar los tipos de error
    if (!userSender || !userReciever || !userReciever.active)
      throw new HttpException(
        'The reciever dosent exist',
        HttpStatus.BAD_REQUEST,
      );

    const message = this.messageRepository.create({
      from: userSender,
      to: userReciever,
      message: newMessage.message,
      created_at: new Date(),
    });
    await this.messageRepository.save(message);
    return message;
  }
  // async getRecievedMessages() {}

  async getMessagesSended(username: string) {
    const user = await this.usersService.getByEmail(username);
    console.log(user);
    const messages = await this.messageRepository.find({
      relations: ['to'],
      where: {
        from: user,
      },
    }); //TODO: change the to and eliminate the password
    return messages;
  }
}