import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from 'src/track/dto/track.dto';
import { Artist } from 'src/artist/artist.model';
import { ArtistDto } from 'src/artist/dto/artist.dto';
import { Album } from 'src/album/album.model';
import { AlbumDto } from 'src/album/dto/album.dto';
import { Track } from 'src/track/track.model';
import { ResponseFavoritesDto } from 'src/favorites/dto/response-favorites.dto';
import { Favorites } from 'src/favorites/favorites.model';

@Injectable()
export class InMemoryDbService {
  readonly users: User[] = [];
  readonly tracks: Track[] = [];
  readonly artists: Artist[] = [];
  readonly albums: Album[] = [];
  readonly favorites: Favorites = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [],
  };

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
    const newTrackUUID = uuidv4();

    const newTrack: Track = {
      id: newTrackUUID,
      ...dto,
    };
    this.tracks.push(newTrack);
    return this.findTrackById(newTrack.id);
  }

  async findTrackById(id: string): Promise<Track> {
    return this.tracks.find((track) => track.id === id);
  }

  async updateTrackById(id: string, dto: TrackDto): Promise<boolean> {
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

  async findAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async createArtist(dto: ArtistDto): Promise<Artist> {
    const newArtistUUID = uuidv4();

    const newArtist: Artist = {
      id: newArtistUUID,
      ...dto,
    };
    this.artists.push(newArtist);
    return this.findArtistById(newArtist.id);
  }

  async findArtistById(id: string): Promise<Artist> {
    return this.artists.find((artist) => artist.id === id);
  }

  async updateArtistById(id: string, dto: ArtistDto): Promise<boolean> {
    const artistToUpdate = this.artists.find((artist) => artist.id === id);
    if (!artistToUpdate) return false;
    Object.assign(artistToUpdate, dto);
    return true;
  }

  async deleteArtistById(id: string): Promise<boolean> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      return false;
    }

    const artistToDelete = this.artists[artistIndex];

    this.tracks.forEach((track) => {
      if (track.artistId && track.artistId === artistToDelete.id) {
        track.artistId = null;
      }
    });

    this.albums.forEach((album) => {
      if (album.artistId && album.artistId === artistToDelete.id) {
        album.artistId = null;
      }
    });

    this.artists.splice(artistIndex, 1);
    return true;
  }

  async findAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async createAlbum(dto: AlbumDto): Promise<Album> {
    const newAlbumUUID = uuidv4();

    const newAlbum: Album = {
      id: newAlbumUUID,
      ...dto,
    };
    this.albums.push(newAlbum);
    return this.findAlbumById(newAlbum.id);
  }

  async findAlbumById(id: string): Promise<Album> {
    return this.albums.find((album) => album.id === id);
  }

  async updateAlbumById(id: string, dto: AlbumDto): Promise<boolean> {
    const albumToUpdate = this.albums.find((album) => album.id === id);
    if (!albumToUpdate) return false;
    Object.assign(albumToUpdate, dto);
    return true;
  }

  async deleteAlbumById(id: string): Promise<boolean> {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      return false;
    }

    const albumToDelete = this.albums[albumIndex];

    this.tracks.forEach((track) => {
      if (track.albumId && track.albumId === albumToDelete.id) {
        track.albumId = null;
      }
    });

    this.albums.splice(albumIndex, 1);
    return true;
  }

  async findAllFavorites(): Promise<ResponseFavoritesDto> {
    const favAlbums: Album[] = [];
    const favArtists: Artist[] = [];
    const favTracks: Track[] = [];

    this.favorites.albums.forEach((albumId) => {
      const album = this.albums.find((album) => album.id === albumId);
      if (album) {
        favAlbums.push(album);
      }
    });

    this.favorites.artists.forEach((artistId) => {
      const artist = this.artists.find((artist) => artist.id === artistId);
      if (artist) {
        favArtists.push(artist);
      }
    });

    this.favorites.tracks.forEach((trackId) => {
      const track = this.tracks.find((track) => track.id === trackId);
      if (track) {
        favTracks.push(track);
      }
    });

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  async addTrackToFavorites(id: string): Promise<boolean> {
    const trackToAddToFavs = this.tracks.find((track) => track.id === id);
    if (!trackToAddToFavs) return false;

    if (this.favorites.tracks.find((trackId) => trackId === id)) {
      return;
    }
    this.favorites.tracks.push(id);
    return true;
  }

  async addArtistToFavorites(id: string): Promise<boolean> {
    const artistToAddToFavs = this.artists.find((artist) => artist.id === id);
    if (!artistToAddToFavs) return false;

    if (this.favorites.artists.find((artistId) => artistId === id)) {
      return;
    }
    this.favorites.artists.push(id);
    return true;
  }

  async addAlbumToFavorites(id: string): Promise<boolean> {
    const albumToAddToFavs = this.albums.find((album) => album.id === id);
    if (!albumToAddToFavs) return false;

    if (this.favorites.albums.find((albumId) => albumId === id)) {
      return;
    }
    this.favorites.albums.push(id);
    return true;
  }

  async deleteTrackFromFavorites(id: string): Promise<boolean> {
    // const trackToDeleteFromFavs = this.tracks.find((track) => track.id === id);
    // if (!trackToDeleteFromFavs) return false;

    const trackIndex = this.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIndex === -1) {
      return false;
    }

    this.favorites.tracks.splice(trackIndex, 1);
    return true;
  }

  async deleteArtistFromFavorites(id: string): Promise<boolean> {
    // const artistToDeleteFromFavs = this.artists.find(
    //   (artist) => artist.id === id,
    // );
    // if (!artistToDeleteFromFavs) return false;

    const artistIndex = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIndex === -1) {
      return false;
    }

    this.favorites.artists.splice(artistIndex, 1);
    return true;
  }

  async deleteAlbumFromFavorites(id: string): Promise<boolean> {
    // const albumToDeleteFromFavs = this.albums.find((album) => album.id === id);
    // if (!albumToDeleteFromFavs) return false;

    const albumIndex = this.favorites.albums.findIndex(
      (albumIndex) => albumIndex === id,
    );

    if (albumIndex === -1) {
      return false;
    }

    this.favorites.albums.splice(albumIndex, 1);
    return true;
  }
}
