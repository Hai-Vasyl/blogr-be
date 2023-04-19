import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rating } from '../../common/entities/rating.entity';
import { User } from '../users/user.entity';
import { File } from './file.entity';

@Entity('file_ratings')
export class FileRating extends Rating {
  @PrimaryGeneratedColumn('uuid', { name: 'file_rating_id' })
  fileRatingId: string;

  @ManyToOne(() => User, (user) => user.blogRatings)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  @ManyToOne(() => File, (file) => file.fileRatings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'file_id' })
  file: File | null;
}
