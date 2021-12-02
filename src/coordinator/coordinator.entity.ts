import { User } from 'src/auth/user.entity';
import { Lider } from 'src/lider/lider.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CoordinatorStatus } from './coordinator-status.enum';

@Entity()
export class Coordinator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  dni: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  phone: number;

  @Column({ nullable: true })
  phone_two: number;

  @Column()
  email: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  birth_date: Date;

  @Column()
  status: CoordinatorStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToMany(() => Lider, (lider) => lider.coordinator, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  liders: Lider[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
