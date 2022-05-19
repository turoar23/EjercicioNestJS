import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getNotifications(@Request() req) {
    return await this.notificationsService.getNotifications(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getNewsNotifications(@Request() req) {
    return await this.notificationsService.getNewNotifications(
      req.user.username,
    );
  }
}
