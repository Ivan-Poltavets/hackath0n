import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Rating } from './rating.entity';
import { User } from './user.entity';

@Entity('locations')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-array' })
  coordinates: string[];

  @ManyToOne(() => User, (user) => user.locations)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.location, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.location, {
    onDelete: 'CASCADE',
  })
  ratings: Rating[];

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
