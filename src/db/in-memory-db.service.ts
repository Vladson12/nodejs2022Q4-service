import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from 'src/track/dto/track.dto';

@Injectable()
export class InMemoryDbService {
  readonly users: User[] = [];
  readonly tracks: Track[] = [];

  async findAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const newUserUUID = uuidv4();
    const timestamp = Date.now();

    const newUser: User = {
      id: newUserUUID,
      createdAt: timestamp,
      updatedAt: timestamp,
      version: 1,
      ...dto,
    };
    this.users.push(newUser);
    return this.findUserById(newUserUUID);
  }

  async findUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async updateUserById(id: string, dto: Omit<User, 'id'>): Promise<boolean> {
    const userToUpdate = this.users.find((user) => user.id === id);
    if (!userToUpdate) return false;
    Object.assign(userToUpdate, dto);
    userToUpdate.version++;
    userToUpdate.updatedAt = Date.now();
    return true;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }

  async findAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async createTrack(dto: TrackDto): Promise<Track> {
    const newUserUUID = uuidv4();

    const newTrack: Track = {
      id: newUserUUID,
      ...dto,
    };
    this.tracks.push(newTrack);
    return this.findTrackById(newTrack.id);
  }

  async findTrackById(id: string): Promise<Track> {
    return this.tracks.find((track) => track.id === id);
  }

  async updateTrackById(id: string, dto: Omit<Track, 'id'>): Promise<boolean> {
    const trackToUpdate = this.tracks.find((track) => track.id === id);
    if (!trackToUpdate) return false;
    Object.assign(trackToUpdate, dto);
    return true;
  }

  async deleteTrackById(id: string): Promise<boolean> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      return false;
    }
    this.tracks.splice(trackIndex, 1);
    return true;
  }
}
