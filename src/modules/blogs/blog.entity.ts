import { Base } from '@common/entities';
import { AccessTypes } from '@common/enums';
import { BlogRating } from '@modules/blogs/blog-rating.entity';
import { Bookmark } from '@modules/bookmarks/bookmark.entity';
import { Category } from '@modules/categories/category.entity';
import { Comment } from '@modules/comments/comment.entity';
import { File } from '@modules/files/file.entity';
import { Notification } from '@modules/notifications/notification.entity';
import { Section } from '@modules/sections/section.entity';
import { Tag } from '@modules/tags/tag.entity';
import { User } from '@modules/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blogs')
export class Blog extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'blog_id' })
  blogId: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  description: string;

  @Column({
    type: 'enum',
    enum: AccessTypes,
    default: AccessTypes.PUBLIC,
    name: 'access_type',
  })
  accessType: AccessTypes;

  @Column({ type: 'int', default: 0, name: 'ratings_number' })
  ratingsNumber: number;

  @Column({ type: 'int', default: 0, name: 'comments_number' })
  commentsNumber: number;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Category, (category) => category.blogs)
  @JoinColumn({ name: 'category_id' })
  category: Category | null;

  @ManyToOne(() => File, (file) => file.blogs)
  @JoinColumn({ name: 'preview_id' })
  preview: File | null;

  // ---

  @OneToMany(() => Section, (section) => section.blog)
  sections: Section[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.blog)
  bookmarks: Bookmark[];

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @OneToMany(() => BlogRating, (blogRating) => blogRating.blog)
  blogRatings: BlogRating[];

  @OneToMany(() => Notification, (notification) => notification.contextBlog)
  notifications: Notification[];

  @ManyToMany(() => Tag, (tag) => tag.blogs)
  tags: Tag[];
}
