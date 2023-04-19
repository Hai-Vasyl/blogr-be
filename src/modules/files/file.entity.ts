import { Base } from '@common/entities';
import { AccessTypes } from '@common/enums';
import { Blog } from '@modules/blogs/blog.entity';
import { Category } from '@modules/categories/category.entity';
import { FileTypes } from '@modules/files/enums/file-type.enum';
import { Sizes } from '@modules/files/enums/size.enum';
import { FileRating } from '@modules/files/file-rating.entity';
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

@Entity('files')
export class File extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'file_id' })
  fileId: string;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string | null;

  @Column({
    type: 'enum',
    enum: AccessTypes,
    default: AccessTypes.PUBLIC,
    name: 'access_type',
  })
  accessType: AccessTypes;

  @Column({
    type: String,
    enum: FileTypes,
    nullable: false,
    name: 'file_type',
  })
  fileType: FileTypes;

  @Column({ type: 'enum', enum: Sizes, nullable: false })
  size: Sizes;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  // ---

  @OneToMany(() => User, (user) => user.avatar)
  users: User[];

  @OneToMany(() => Blog, (blog) => blog.preview)
  blogs: Blog[];

  @OneToMany(() => Section, (section) => section.preview)
  sections: Section[];

  @OneToMany(() => Category, (category) => category.preview)
  categories: Category[];

  @OneToMany(() => Notification, (notification) => notification.contextFile)
  notifications: Notification[];

  @OneToMany(() => FileRating, (fileRating) => fileRating.file)
  fileRatings: FileRating[];

  @ManyToMany(() => Tag, (tag) => tag.files)
  tags: Tag[];
}
