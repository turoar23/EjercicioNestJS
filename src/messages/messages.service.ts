import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateMessageDto from './dto/createMessage.dto';
import Message from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(newMessage: CreateMessageDto) {
    const message = this.messageRepository.create({
      ...newMessage,
      created_at: new Date(),
    });
    await this.messageRepository.save(message);
    return message;
  }
  // async getRecievedMessages() {}
}
