import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', { length: 50 })
  @Exclude()
  password: string;

  @Column('integer', { default: 1 })
  version: number;

  @Column('bigint')
  readonly createdAt: number;

  @Column('bigint')
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
