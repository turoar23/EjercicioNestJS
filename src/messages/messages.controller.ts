import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateMessageDto from './dto/createMessage.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(@Request() req, @Body() messageData: CreateMessageDto) {
    await this.messagesService.sendMessage(req.user.username, messageData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sended')
  getMessagesSended(@Request() req) {
    return this.messagesService.getMessagesSended(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recieved')
  getMessagesRecievedd(@Request() req) {
    return this.messagesService.getMessagesRecieved(req.user.username);
  }
}
