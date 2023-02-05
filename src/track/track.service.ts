import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/db/in-memory-db.service';
import { TrackDto } from './dto/track.dto';
import {
  TrackServiceException,
  TrackServiceExceptionType,
} from './exceptions/track-service-exception';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: InMemoryDbService) {}

  async create(dto: TrackDto): Promise<Track> {
    return this.dbService.createTrack(dto);
  }

  async findAll(): Promise<Track[]> {
    return this.dbService.findAllTracks();
  }

  async findById(id: string): Promise<Track> {
    const foundTrack = await this.dbService.findTrackById(id);
    if (!foundTrack) {
      throw new TrackServiceException(TrackServiceExceptionType.NOT_FOUND);
    }
    return foundTrack;
  }

  async updateById(id: string, dto: TrackDto): Promise<Track> {
    const trackToUpdate = await this.findById(id);

    Object.assign(trackToUpdate, dto);

    const isUpdated = await this.dbService.updateTrackById(
      trackToUpdate.id,
      trackToUpdate,
    );

    if (!isUpdated) {
      throw new TrackServiceException(TrackServiceExceptionType.INTERNAL_ERROR);
    }

    return this.findById(trackToUpdate.id);
  }

  async deleteById(id: string) {
    const trackToDelete = await this.findById(id);
    if (!trackToDelete) {
      throw new TrackServiceException(TrackServiceExceptionType.NOT_FOUND);
    }

    const isDeleted = await this.dbService.deleteTrackById(id);
    if (!isDeleted) {
      throw new TrackServiceException(TrackServiceExceptionType.INTERNAL_ERROR);
    }
  }
}
