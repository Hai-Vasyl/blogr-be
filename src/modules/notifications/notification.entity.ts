import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Base } from '../../common/entities/base.entity';
import { Blog } from '../blogs/blog.entity';
import { Comment } from '../comments/comment.entity';
import { File } from '../files/file.entity';
import { ContextTypeEnum } from './enums/context-type.enum';

@Entity('notifications')
export class Notification extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_id' })
  notificationId: string;

  @Column({ type: 'boolean', default: false, name: 'is_read' })
  isRead: boolean;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  body: string;

  @Column({
    type: 'enum',
    enum: ContextTypeEnum,
    nullable: false,
    name: 'context_type',
  })
  contextType: ContextTypeEnum;

  @ManyToOne(() => File, (file) => file.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'context_file_id' })
  contextFile: File | null;

  @ManyToOne(() => Blog, (blog) => blog.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'context_blog_id' })
  contextBlog: Blog | null;

  @ManyToOne(() => Comment, (comment) => comment.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'context_comment_id' })
  contextComment: Comment | null;
}
