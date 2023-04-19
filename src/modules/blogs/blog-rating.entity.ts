import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Rating } from '../../common/entities/rating.entity';
import { User } from '../users/user.entity';
import { Blog } from './blog.entity';

@Entity('blog_ratings')
export class BlogRating extends Rating {
  @PrimaryGeneratedColumn('uuid', { name: 'blog_rating_id' })
  blogRatingId: string;

  @ManyToOne(() => User, (user) => user.blogRatings)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Blog, (blog) => blog.blogRatings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog | null;
}
