import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/db/in-memory-db.service';
import { ResponseFavoritesDto } from './dto/response-favorites.dto';
import {
  FavoritesServiceException,
  FavoritesServiceExceptionType,
} from './exceptions/favorites-service-exception';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: InMemoryDbService) {}

  async findAll(): Promise<ResponseFavoritesDto> {
    return this.dbService.findAllFavorites();
  }

  async addArtist(id: string) {
    const isAdded = await this.dbService.addArtistToFavorites(id);
    if (!isAdded) {
      throw new FavoritesServiceException(
        FavoritesServiceExceptionType.ARTIST_NOT_FOUND,
      );
    }
    return;
  }

  async addAlbum(id: string) {
    const isAdded = await this.dbService.addAlbumToFavorites(id);
    if (!isAdded) {
      throw new FavoritesServiceException(
        FavoritesServiceExceptionType.ALBUM_NOT_FOUND,
      );
    }
    return;
  }

  async addTrack(id: string) {
    const isAdded = await this.dbService.addTrackToFavorites(id);
    if (!isAdded) {
      throw new FavoritesServiceException(
        FavoritesServiceExceptionType.TRACK_NOT_FOUND,
      );
    }
    return;
  }

  async deleteArtist(id: string): Promise<boolean> {
    const isDeleted = await this.dbService.deleteArtistFromFavorites(id);
    if (!isDeleted) {
      throw new FavoritesServiceException(
        FavoritesServiceExceptionType.ARTIST_NOT_FAVORITE,
      );
    }
    return isDeleted;
  }

  async deleteAlbum(id: string): Promise<boolean> {
    const isDeleted = await this.dbService.deleteAlbumFromFavorites(id);
    if (!isDeleted) {
      throw new FavoritesServiceException(
        FavoritesServiceExceptionType.ALBUM_NOT_FAVORITE,
      );
    }
    return isDeleted;
  }

  async deleteTrack(id: string): Promise<boolean> {
    const isDeleted = await this.dbService.deleteTrackFromFavorites(id);
    if (!isDeleted) {
      throw new FavoritesServiceException(
        FavoritesServiceExceptionType.TRACK_NOT_FAVORITE,
      );
    }
    return isDeleted;
  }
}
