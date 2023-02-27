import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, unique: true })
  login: string;

  @Column('varchar', { length: 256 })
  @Exclude()
  password: string;

  @Column('integer', { default: 1 })
  version: number;

  @Column('bigint')
  readonly createdAt: number;

  @Column('bigint')
  updatedAt: number;

  @Column('varchar', { nullable: true })
  @Exclude()
  refreshToken: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
