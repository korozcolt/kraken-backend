import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Coordinator } from 'src/coordinator/coordinator.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { LiderStatus } from './lider-status.enum';

@Entity()
export class Lider {
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
  status: LiderStatus;

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

  @ManyToOne(() => Coordinator, (coordinator) => coordinator.liders, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  coordinator: Coordinator;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
