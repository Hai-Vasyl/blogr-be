import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Rating extends Base {
  @Column({ type: 'boolean', nullable: false, name: 'is_positive' })
  isPositive: boolean;
}
