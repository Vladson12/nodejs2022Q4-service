import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist; // refers to Artist

  @Column('uuid')
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks)
  album: Album; // refers to Artist

  @Column('uuid')
  albumId: string | null;

  @Column()
  duration: number; // integer number

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
