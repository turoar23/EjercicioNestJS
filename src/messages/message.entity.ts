import User from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User, (from: User) => from.messages)
  public from: User;

  @ManyToOne(() => User, (to: User) => to.messages)
  public to: User;

  @Column()
  public message: string;

  @Column()
  public created_at: Date;
}

export default Message;
