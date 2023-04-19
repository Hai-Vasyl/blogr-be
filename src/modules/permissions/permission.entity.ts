import { Base } from '@common/entities';
import { Permissions } from '@common/enums';
import { Role } from '@modules/roles/role.entity';
import { User } from '@modules/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission extends Base {
  @PrimaryGeneratedColumn('uuid', { name: 'permission_id' })
  permissionId: string;

  @Column({ type: 'enum', nullable: false, enum: Permissions, unique: true })
  name: Permissions;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  description: string;

  @ManyToOne(() => User, (user) => user.permissions)
  @JoinColumn({ name: 'creator_id' })
  creator: User | null;

  // ---

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
