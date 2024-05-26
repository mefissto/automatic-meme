import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDefined } from 'class-validator';

/**
 * Represents a TodoEntity with label, completed status, creation date, and update date.
 *
 * @entity
 */
@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @Column({ nullable: false })
  label: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
