import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesUser } from './roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: RolesUser.USER })
  role: RolesUser;
}
