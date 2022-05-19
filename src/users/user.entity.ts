import Message from 'src/messages/message.entity';
import Notification from '../notifications/notification.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @Column()
  public active: boolean;

  @OneToMany(() => Message, (messages: Message) => messages.from)
  public messages: Message[];

  @OneToMany(
    () => Notification,
    (notifications: Notification) => notifications.user,
  )
  public notifications: Notification[];
}

export default User;
