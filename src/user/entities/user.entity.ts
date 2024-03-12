import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
