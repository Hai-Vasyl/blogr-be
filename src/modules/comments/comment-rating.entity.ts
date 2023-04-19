import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Rating } from '../../common/entities/rating.entity';
import { User } from '../users/user.entity';
import { Comment } from './comment.entity';

@Entity('comment_ratings')
export class CommentRating extends Rating {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_rating_id' })
  commentRatingId: string;

  @ManyToOne(() => User, (user) => user.commentRatings)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => Comment, (comment) => comment.commentRatings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment | null;
}
