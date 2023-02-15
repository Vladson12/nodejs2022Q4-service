import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import {
  TrackServiceException,
  TrackServiceExceptionType,
} from './exceptions/track-service-exception';
import { Track } from './track.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(dto: TrackDto): Promise<Track> {
    const createdTrack = this.trackRepository.create(dto);
    return this.trackRepository.save(createdTrack);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async findById(id: string): Promise<Track> {
    const foundTrack = await this.trackRepository.findOneBy({ id });
    if (!foundTrack) {
      throw new TrackServiceException(TrackServiceExceptionType.NOT_FOUND);
    }
    return foundTrack;
  }

  async updateById(id: string, dto: TrackDto): Promise<Track> {
    const trackToUpdate = await this.findById(id);
    Object.assign(trackToUpdate, dto);
    const isUpdated = await this.trackRepository.update(
      trackToUpdate.id,
      trackToUpdate,
    );
    if (!isUpdated) {
      throw new TrackServiceException(TrackServiceExceptionType.INTERNAL_ERROR);
    }
    return this.findById(trackToUpdate.id);
  }
  async deleteById(id: string) {
    await this.findById(id);

    const isDeleted = await this.trackRepository.delete(id);
    if (!isDeleted) {
      throw new TrackServiceException(TrackServiceExceptionType.INTERNAL_ERROR);
    }
  }
}
