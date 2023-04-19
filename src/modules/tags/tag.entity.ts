import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Base } from '../../common/entities/base.entity';
import { Blog } from '../blogs/blog.entity';
import { File } from '../files/file.entity';
import { Section } from '../sections/section.entity';
import { User } from '../users/user.entity';

@Entity('tags')
export class Tag extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'tag_id' })
  tagId: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'boolean', default: false, name: 'is_user_based' })
  isUserBased: boolean;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  // ---

  @ManyToMany(() => Blog, (blog) => blog.tags)
  @JoinTable({
    name: 'tags_blogs',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'blog_id' },
  })
  blogs: Blog[];

  @ManyToMany(() => Section, (section) => section.tags)
  @JoinTable({
    name: 'tags_sections',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'section_id' },
  })
  sections: Section[];

  @ManyToMany(() => File, (file) => file.tags)
  @JoinTable({
    name: 'tags_files',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'file_id' },
  })
  files: File[];

  @ManyToMany(() => User, (user) => user.tagsUserBased)
  @JoinTable({
    name: 'tags_users',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
