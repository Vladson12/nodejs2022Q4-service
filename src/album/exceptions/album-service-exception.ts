export enum AlbumServiceExceptionType {
  NOT_FOUND = 'Album with such id not found',
  INTERNAL_ERROR = 'Internal service error',
}

export class AlbumServiceException extends Error {
  constructor(message: AlbumServiceExceptionType) {
    super(message as string);
  }
}
