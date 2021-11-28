import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Location } from './location.entity';
import { User } from './user.entity';

@Entity('ratings')
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like: boolean;

  @ManyToOne(() => Location, (location) => location.ratings)
  location: Location;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
