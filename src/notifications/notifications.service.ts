import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import CreateNotificationDto from './dto/createNotification.dto';
import Notification from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    private usersService: UsersService,
  ) {}

  async create(username: string, notificationData: CreateNotificationDto) {
    const user = await this.usersService.getByEmail(username);
    const newNotification = {
      user: user,
      description: notificationData.description,
      read: false,
      created_at: new Date(),
    };
    const notification = await this.notificationsRepository.create(
      newNotification,
    );
    await this.notificationsRepository.save(notification);
    return notification;
  }

  // Get all the notifications and the ones that wasnt readed, update them to read
  async getNotifications(username: string) {
    const user = await this.usersService.getByEmail(username);
    const notifications = await this.notificationsRepository.find({ user });
    await this.notificationsRepository.update({ user }, { read: true });

    return notifications;
  }

  async getNewNotifications(username: string) {
    const user = await this.usersService.getByEmail(username);
    const notifications = await this.notificationsRepository.find({
      user,
      read: false,
    });

    await this.notificationsRepository.update({ user }, { read: true });

    return notifications;
  }
}
