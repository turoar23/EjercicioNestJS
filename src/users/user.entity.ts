import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public active: boolean;
}

export default User;
