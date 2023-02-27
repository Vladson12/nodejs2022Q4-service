import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.model';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.model';
import { Album } from 'src/album/album.model';
import { Track } from 'src/track/track.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {
    this.init();
  }

  private async init() {
    const favs = await this.favoritesRepository.find();
    if (favs.length === 0) {
      this.favoritesRepository.save(this.favoritesRepository.create({}));
    }
  }

  async findAll() {
    const allFavs = await this.favoritesRepository.find();

    return allFavs[0];
  }

  async addArtist(id: string) {
    const artistToAddToFavs = await this.artistsRepository.findOneBy({ id });
    if (!artistToAddToFavs) {
      throw new UnprocessableEntityException('Artist with such id not found');
    }

    if (!artistToAddToFavs.favoritesId) {
      artistToAddToFavs.favoritesId = (
        await this.favoritesRepository.find()
      )[0].id;
    }

    this.artistsRepository.update(artistToAddToFavs.id, artistToAddToFavs);
  }

  async addAlbum(id: string) {
    const albumToAddToFavs = await this.albumsRepository.findOneBy({ id });
    if (!albumToAddToFavs) {
      throw new UnprocessableEntityException('Album with such id not found');
    }

    if (!albumToAddToFavs.favoritesId) {
      albumToAddToFavs.favoritesId = (
        await this.favoritesRepository.find()
      )[0].id;
    }
    this.albumsRepository.update(albumToAddToFavs.id, albumToAddToFavs);
  }

  async addTrack(id: string) {
    const trackToAddToFavs = await this.tracksRepository.findOneBy({ id });
    if (!trackToAddToFavs) {
      throw new UnprocessableEntityException('Track with such id not found');
    }

    if (!trackToAddToFavs.favoritesId) {
      trackToAddToFavs.favoritesId = (
        await this.favoritesRepository.find()
      )[0].id;
    }
    this.tracksRepository.update(trackToAddToFavs.id, trackToAddToFavs);
  }

  async deleteArtist(id: string) {
    const artistToDeleteFromFavs = await this.artistsRepository.findOneBy({
      id,
    });
    if (!artistToDeleteFromFavs) {
      throw new UnprocessableEntityException('Artist with such id not found');
    }

    if (!artistToDeleteFromFavs.favoritesId) {
      throw new NotFoundException('Artist with such id not in favorites');
    }

    artistToDeleteFromFavs.favoritesId = null;
    this.artistsRepository.update(
      artistToDeleteFromFavs.id,
      artistToDeleteFromFavs,
    );
  }

  async deleteAlbum(id: string) {
    const albumToDeleteFromFavs = await this.albumsRepository.findOneBy({
      id,
    });
    if (!albumToDeleteFromFavs) {
      throw new UnprocessableEntityException('Album with such id not found');
    }

    if (!albumToDeleteFromFavs.favoritesId) {
      throw new NotFoundException('Album with such id not in favorites');
    }

    albumToDeleteFromFavs.favoritesId = null;
    this.albumsRepository.update(
      albumToDeleteFromFavs.id,
      albumToDeleteFromFavs,
    );
  }

  async deleteTrack(id: string) {
    const trackToDeleteFromFavs = await this.tracksRepository.findOneBy({
      id,
    });
    if (!trackToDeleteFromFavs) {
      throw new UnprocessableEntityException('Track with such id not found');
    }

    if (!trackToDeleteFromFavs.favoritesId) {
      throw new NotFoundException('Album with such id not in favorites');
    }

    trackToDeleteFromFavs.favoritesId = null;
    this.tracksRepository.update(
      trackToDeleteFromFavs.id,
      trackToDeleteFromFavs,
    );
  }
}
