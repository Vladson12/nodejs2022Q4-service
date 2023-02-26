import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './artist.model';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new NotFoundException('Artist with such id not found');
    }
    return foundArtist;
  }

  async updateById(id: string, dto: ArtistDto): Promise<Artist> {
    const artistToUpdate = await this.findById(id);
    Object.assign(artistToUpdate, dto);

    return this.artistsRepository.save(artistToUpdate);
  }

  async deleteById(id: string) {
    await this.findById(id);

    this.artistsRepository.delete(id);
  }
}
