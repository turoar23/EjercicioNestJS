import User from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Notification {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User, (user: User) => user.notifications)
  public user: User;

  @Column()
  public read: boolean;

  @Column()
  public description: string;

  @Column()
  public created_at: Date;
}

export default Notification;
