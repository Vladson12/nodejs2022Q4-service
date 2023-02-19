import { Exclude } from 'class-transformer';
import { Album } from 'src/album/album.model';
import { Favorites } from 'src/favorites/favorites.model';
import { Track } from 'src/track/track.model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Album[];

  @ManyToOne(() => Favorites, (favorites) => favorites.artists)
  favorites: Favorites;

  @Exclude()
  @Column('uuid', { nullable: true, default: null })
  favoritesId: string | null;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
