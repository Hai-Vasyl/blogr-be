import { Base } from '@common/entities';
import { AccessTypes } from '@common/enums';
import { Blog } from '@modules/blogs/blog.entity';
import { User } from '@modules/users/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('bookmarks')
export class Bookmark extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'bookmark_id' })
  bookmarkId: string;

  @Column({
    type: 'enum',
    enum: AccessTypes,
    default: AccessTypes.PUBLIC,
    name: 'access_type',
  })
  accessType: AccessTypes;

  @ManyToOne(() => Blog, (blog) => blog.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog | null;

  @ManyToOne(() => User, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;
}
