import { Exclude } from 'class-transformer';
import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Favorites } from 'src/favorites/favorites.model';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  artist: Artist; // refers to Artist

  @Column('uuid', { nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  album: Album; // refers to Artist

  @Column('uuid', { nullable: true })
  albumId: string | null;

  @ManyToOne(() => Favorites, (favorites) => favorites.tracks)
  favorites: Favorites;

  @Exclude()
  @Column('uuid', { nullable: true, default: null })
  favoritesId: string | null;

  @Column()
  duration: number; // integer number

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
