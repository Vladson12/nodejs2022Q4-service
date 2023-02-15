import { Artist } from 'src/artist/artist.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist; // refers to Artist

  @Column('uuid')
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
