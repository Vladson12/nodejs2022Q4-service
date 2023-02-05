export enum FavoritesServiceExceptionType {
  TRACK_NOT_FOUND = 'Track with such id not found',
  ARTIST_NOT_FOUND = 'Artist with such id not found',
  ALBUM_NOT_FOUND = 'Album with such id not found',
  TRACK_NOT_FAVORITE = 'Track with such id not in favorites',
  ARTIST_NOT_FAVORITE = 'Artist with such id not in favorites',
  ALBUM_NOT_FAVORITE = 'Album with such id not in favorites',
  INTERNAL_ERROR = 'Internal service error',
}

export class FavoritesServiceException extends Error {
  constructor(message: FavoritesServiceExceptionType) {
    super(message as string);
  }
}
