import { Exclude } from 'class-transformer';
import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Track } from 'src/track/track.model';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @OneToMany(() => Artist, (artist) => artist.favorites, { eager: true })
  artists: Artist[]; // favorite artists ids

  @OneToMany(() => Album, (album) => album.favorites, { eager: true })
  albums: Album[]; // favorite albums ids

  @OneToMany(() => Track, (track) => track.favorites, { eager: true })
  tracks: Track[]; // favorite tracks ids

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
