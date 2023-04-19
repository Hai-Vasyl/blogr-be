import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Blog } from '../blogs/blog.entity';
import { File } from '../files/file.entity';
import { User } from '../users/user.entity';

@Entity('categories')
export class Category extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  categoryId: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string | null;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => File, (file) => file.categories)
  @JoinColumn({ name: 'preview_id' })
  preview: File | null;

  // ---

  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Blog[];
}
