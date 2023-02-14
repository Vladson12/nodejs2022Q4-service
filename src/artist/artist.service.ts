import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/db/in-memory-db.service';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './artist.model';
import {
  ArtistServiceException,
  ArtistServiceExceptionType,
} from './exceptions/artist-service-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(dto: ArtistDto): Promise<Artist> {
    const createdArtist = this.artistsRepository.create(dto);
    return this.artistsRepository.save(createdArtist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findById(id: string): Promise<Artist> {
    const foundArtist = await this.artistsRepository.findOneBy({ id });
    if (!foundArtist) {
      throw new ArtistServiceException(ArtistServiceExceptionType.NOT_FOUND);
    }
    return foundArtist;
  }

  async updateById(id: string, dto: ArtistDto): Promise<Artist> {
    const artistToUpdate = await this.findById(id);
    Object.assign(artistToUpdate, dto);
    const isUpdated = await this.artistsRepository.update(
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
    await this.findById(id);

    const isDeleted = await this.artistsRepository.delete(id);
    if (!isDeleted) {
      throw new ArtistServiceException(
        ArtistServiceExceptionType.INTERNAL_ERROR,
      );
    }
  }
}
