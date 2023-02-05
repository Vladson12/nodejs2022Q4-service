import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Track } from 'src/track/track.model';

export interface ResponseFavoritesDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
