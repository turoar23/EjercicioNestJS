import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import Notification from './notification.entity';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UsersModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
