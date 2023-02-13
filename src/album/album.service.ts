import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/db/in-memory-db.service';
import { AlbumDto } from './dto/album.dto';
import { Album } from './album.model';
import {
  AlbumServiceException,
  AlbumServiceExceptionType,
} from './exceptions/album-service-exception';

@Injectable()
export class AlbumService {
  // constructor(private readonly dbService: InMemoryDbService) {}
  // async create(dto: AlbumDto): Promise<Album> {
  //   return this.dbService.createAlbum(dto);
  // }
  // async findAll(): Promise<Album[]> {
  //   return this.dbService.findAllAlbums();
  // }
  // async findById(id: string): Promise<Album> {
  //   const foundAlbum = await this.dbService.findAlbumById(id);
  //   if (!foundAlbum) {
  //     throw new AlbumServiceException(AlbumServiceExceptionType.NOT_FOUND);
  //   }
  //   return foundAlbum;
  // }
  // async updateById(id: string, dto: AlbumDto): Promise<Album> {
  //   const albumToUpdate = await this.findById(id);
  //   Object.assign(albumToUpdate, dto);
  //   const isUpdated = await this.dbService.updateAlbumById(
  //     albumToUpdate.id,
  //     albumToUpdate,
  //   );
  //   if (!isUpdated) {
  //     throw new AlbumServiceException(AlbumServiceExceptionType.INTERNAL_ERROR);
  //   }
  //   return this.findById(albumToUpdate.id);
  // }
  // async deleteById(id: string) {
  //   const albumToDelete = await this.findById(id);
  //   if (!albumToDelete) {
  //     throw new AlbumServiceException(AlbumServiceExceptionType.NOT_FOUND);
  //   }
  //   const isDeleted = await this.dbService.deleteAlbumById(id);
  //   if (!isDeleted) {
  //     throw new AlbumServiceException(AlbumServiceExceptionType.INTERNAL_ERROR);
  //   }
  // }
}
