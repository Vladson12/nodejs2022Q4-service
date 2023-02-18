import { Artist } from 'src/artist/artist.model';
import { Track } from 'src/track/track.model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  artist: Artist; // refers to Artist

  @Column('uuid', { nullable: true })
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
