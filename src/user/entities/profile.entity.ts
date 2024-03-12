import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  constructor(profile: Partial<Profile>) {
    Object.assign(this, profile);
  }
}
