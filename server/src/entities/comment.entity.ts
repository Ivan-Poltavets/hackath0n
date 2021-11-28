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
import { Location } from './location.entity';

import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'int', default: 0 })
  responseCount: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.responses)
  comment: Comment;

  @ManyToOne(() => Location, (location) => location.comments)
  location: Location;

  @OneToMany(() => Comment, (response) => response.comment, {
    onDelete: 'CASCADE',
  })
  responses: Comment[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
