import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsService } from 'src/notifications/notifications.service';
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
    private notificationService: NotificationsService,
  ) {}

  async sendMessage(sender: string, newMessage: CreateMessageDto) {
    const userSender = await this.usersService.getByEmail(sender);
    const userReciever = await this.usersService.getByEmail(newMessage.to);

    if (sender === newMessage.to) {
      throw new HttpException(
        'Cant send a message to itself',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!userReciever.active)
      throw new HttpException(
        'The reciever must be active',
        HttpStatus.BAD_REQUEST,
      );

    const message = this.messageRepository.create({
      from: userSender,
      to: userReciever,
      message: newMessage.message,
      created_at: new Date(),
    });
    await this.messageRepository.save(message);
    // Create a notification to the person who was sended the message
    await this.notificationService.create(userReciever.username, {
      description: `You have recieved a new message from ${userReciever.username} at the time ${message.created_at}`,
    });
    message.from.password = undefined;
    message.to.password = undefined;
    return message;
  }
  // async getRecievedMessages() {}

  async getMessagesSended(username: string) {
    const user = await this.usersService.getByEmail(username);
    const messages = await this.messageRepository
      .createQueryBuilder('messages')
      .where({ from: user })
      .select([
        'messages.id',
        'messages.message',
        'messages.created_at',
        'users.id',
        'users.username',
        'users.active',
      ])
      .leftJoin('messages.to', 'users')
      .getMany();
    return messages;
  }

  async getMessagesRecieved(username: string) {
    const user = await this.usersService.getByEmail(username);
    const messages = await this.messageRepository
      .createQueryBuilder('messages')
      .where({ to: user })
      .select([
        'messages.id',
        'messages.message',
        'messages.created_at',
        'users.id',
        'users.username',
        'users.active',
      ])
      .leftJoin('messages.from', 'users')
      .getMany();
    return messages;
  }
}
