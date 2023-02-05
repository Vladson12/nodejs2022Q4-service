import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/db/in-memory-db.service';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './artist.model';
import {
  ArtistServiceException,
  ArtistServiceExceptionType,
} from './exceptions/artist-service-exception';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: InMemoryDbService) {}

  async create(dto: ArtistDto): Promise<Artist> {
    return this.dbService.createArtist(dto);
  }

  async findAll(): Promise<Artist[]> {
    return this.dbService.findAllArtists();
  }

  async findById(id: string): Promise<Artist> {
    const foundArtist = await this.dbService.findArtistById(id);
    if (!foundArtist) {
      throw new ArtistServiceException(ArtistServiceExceptionType.NOT_FOUND);
    }
    return foundArtist;
  }

  async updateById(id: string, dto: ArtistDto): Promise<Artist> {
    const artistToUpdate = await this.findById(id);

    Object.assign(artistToUpdate, dto);

    const isUpdated = await this.dbService.updateArtistById(
      artistToUpdate.id,
      artistToUpdate,
    );

    if (!isUpdated) {
      throw new ArtistServiceException(
        ArtistServiceExceptionType.INTERNAL_ERROR,
      );
    }

    return this.findById(artistToUpdate.id);
  }

  async deleteById(id: string) {
    const artistToDelete = await this.findById(id);
    if (!artistToDelete) {
      throw new ArtistServiceException(ArtistServiceExceptionType.NOT_FOUND);
    }

    const isDeleted = await this.dbService.deleteArtistById(id);
    if (!isDeleted) {
      throw new ArtistServiceException(
        ArtistServiceExceptionType.INTERNAL_ERROR,
      );
    }
  }
}
