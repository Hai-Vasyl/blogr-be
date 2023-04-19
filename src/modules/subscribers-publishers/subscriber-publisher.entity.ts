import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Base } from '../../common/entities/base.entity';
import { User } from '../users/user.entity';

@Entity('subscribers-publishers')
export class SubscriberPublisher extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'subscriber_publisher_id' })
  subscriberPublisherId: string;

  @Column({ type: 'boolean', name: 'is_muted', default: false })
  isMuted: boolean;

  @ManyToOne(() => User, (user) => user.subscribersPublishers, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'subscriber_id',
  })
  subscriber: User;

  @ManyToOne(() => User, (user) => user.publishersSubscribers, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'publisher_id',
  })
  publisher: User;

  // ---
}
