import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { Album } from './album.model';
import {
  AlbumServiceException,
  AlbumServiceExceptionType,
} from './exceptions/album-service-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(dto: AlbumDto): Promise<Album> {
    const createdAlbum = this.albumsRepository.create(dto);
    return this.albumsRepository.save(createdAlbum);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findById(id: string): Promise<Album> {
    const foundAlbum = await this.albumsRepository.findOneBy({ id });
    if (!foundAlbum) {
      throw new AlbumServiceException(AlbumServiceExceptionType.NOT_FOUND);
    }
    return foundAlbum;
  }

  async updateById(id: string, dto: AlbumDto): Promise<Album> {
    const albumToUpdate = await this.findById(id);
    Object.assign(albumToUpdate, dto);
    const isUpdated = await this.albumsRepository.update(
      albumToUpdate.id,
      albumToUpdate,
    );
    if (!isUpdated) {
      throw new AlbumServiceException(AlbumServiceExceptionType.INTERNAL_ERROR);
    }
    return this.findById(albumToUpdate.id);
  }

  async deleteById(id: string) {
    await this.findById(id);

    const isDeleted = await this.albumsRepository.delete(id);
    if (!isDeleted) {
      throw new AlbumServiceException(AlbumServiceExceptionType.INTERNAL_ERROR);
    }
  }
}
