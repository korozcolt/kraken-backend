import { User } from 'src/auth/user.entity';
import { Lider } from 'src/lider/lider.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CoordinatorStatus } from './coordinator-status.enum';

@Entity()
export class Coordinator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint' })
  public dni: string;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public phone: string;

  @Column({ nullable: true })
  public phone_two: string;

  @Column()
  public email: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public birth_date: Date;

  @Column()
  status: CoordinatorStatus;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  public user: User;

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
}
