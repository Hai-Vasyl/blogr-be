import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Base } from '../../common/entities/base.entity';
import { Blog } from '../blogs/blog.entity';
import { Notification } from '../notifications/notification.entity';
import { User } from '../users/user.entity';
import { CommentRating } from './comment-rating.entity';

@Entity('comments')
export class Comment extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  commentId: string;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  body: string;

  @Column({ type: 'int', default: 0, name: 'ratings_number' })
  ratingsNumber: number;

  @Column({ type: 'int', default: 0, name: 'comments_number' })
  commentsNumber: number;

  @Column({ type: 'boolean', default: false, name: 'is_attached' })
  isAttached: boolean;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Blog, (blog) => blog.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog | null;

  @ManyToOne(() => Comment, (comment) => comment.childComments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: Comment | null;

  // ---

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];

  @OneToMany(() => CommentRating, (commentRating) => commentRating.comment)
  commentRatings: CommentRating[];

  @OneToMany(() => Notification, (notification) => notification.contextComment)
  notifications: Notification[];
}
