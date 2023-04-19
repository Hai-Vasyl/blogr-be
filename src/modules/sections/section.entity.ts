import { Base } from '@common/entities';
import { AccessTypes } from '@common/enums';
import { Blog } from '@modules/blogs/blog.entity';
import { File } from '@modules/files/file.entity';
import { Tag } from '@modules/tags/tag.entity';
import { User } from '@modules/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sections')
export class Section extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'section_id' })
  sectionId: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  body: string;

  @Column({
    type: 'enum',
    enum: AccessTypes,
    default: AccessTypes.PUBLIC,
    name: 'access_type',
  })
  accessType: string;

  @Column({ type: 'boolean', default: false, name: 'is_important' })
  isImportant: boolean;

  @Column({ type: 'int', default: 1 })
  order: number;

  @ManyToOne(() => User, (user) => user.sections)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Blog, (blog) => blog.sections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog | null;

  @ManyToOne(() => File, (file) => file.sections)
  @JoinColumn({ name: 'preview_id' })
  preview: File | null;

  // ---

  @ManyToMany(() => Tag, (tag) => tag.sections)
  tags: Tag[];
}
