import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
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
      throw new NotFoundException('Track with such id not found');
    }
    return foundTrack;
  }

  async updateById(id: string, dto: TrackDto): Promise<Track> {
    const trackToUpdate = await this.findById(id);
    Object.assign(trackToUpdate, dto);

    return this.trackRepository.save(trackToUpdate);
  }

  async deleteById(id: string) {
    await this.findById(id);

    await this.trackRepository.delete(id);
  }
}
