import { Base } from '@common/entities';
import { BlogRating } from '@modules/blogs/blog-rating.entity';
import { Blog } from '@modules/blogs/blog.entity';
import { Bookmark } from '@modules/bookmarks/bookmark.entity';
import { Category } from '@modules/categories/category.entity';
import { CommentRating } from '@modules/comments/comment-rating.entity';
import { Comment } from '@modules/comments/comment.entity';
import { File } from '@modules/files/file.entity';
import { Permission } from '@modules/permissions/permission.entity';
import { Role } from '@modules/roles/role.entity';
import { Section } from '@modules/sections/section.entity';
import { SubscriberPublisher } from '@modules/subscribers-publishers/subscriber-publisher.entity';
import { Tag } from '@modules/tags/tag.entity';
import { Genders } from '@modules/users/enums/gender.enum';
import { LoginMethods } from '@modules/users/enums/login-method.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', nullable: false, length: 30, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 30, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Genders, nullable: false })
  gender: Genders;

  @Column({ type: 'date', nullable: true })
  birth: Date | null;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  bio: string | null;

  @Column({
    type: 'enum',
    enum: LoginMethods,
    default: LoginMethods.LOCAL,
    name: 'login_method',
  })
  loginMethod: LoginMethods;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => File, (file) => file.users)
  @JoinColumn({ name: 'avatar_id' })
  avatar: File | null;

  // ---

  @OneToMany(() => Blog, (blog) => blog.creator)
  blogs: Blog[];

  @OneToMany(() => Role, (role) => role.creator)
  roles: Role[];

  @OneToMany(() => Category, (category) => category.creator)
  categories: Category[];

  @OneToMany(() => Permission, (permission) => permission.creator)
  permissions: Permission[];

  @OneToMany(() => Section, (section) => section.creator)
  sections: Section[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.creator)
  bookmarks: Bookmark[];

  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];

  @OneToMany(() => CommentRating, (commentRating) => commentRating.creator)
  commentRatings: CommentRating[];

  @OneToMany(() => BlogRating, (blogRating) => blogRating.creator)
  blogRatings: BlogRating[];

  @OneToMany(() => Tag, (tag) => tag.creator)
  tags: Tag[];

  @OneToMany(() => File, (file) => file.creator)
  files: File[];

  @OneToMany(
    () => SubscriberPublisher,
    (subscriberPublisher) => subscriberPublisher.subscriber,
  )
  subscribersPublishers: SubscriberPublisher[];

  @OneToMany(
    () => SubscriberPublisher,
    (subscriberPublisher) => subscriberPublisher.publisher,
  )
  publishersSubscribers: SubscriberPublisher[];

  @ManyToMany(() => Tag, (tag) => tag.users)
  tagsUserBased: Tag[];
}
