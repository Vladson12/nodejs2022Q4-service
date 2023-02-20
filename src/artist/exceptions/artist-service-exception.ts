export enum ArtistServiceExceptionType {
  NOT_FOUND = 'Artist with such id not found',
  INTERNAL_ERROR = 'Internal service error',
}

export class ArtistServiceException extends Error {
  constructor(message: ArtistServiceExceptionType) {
    super(message as string);
  }
}
