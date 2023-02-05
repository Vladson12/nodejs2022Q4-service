export enum TrackServiceExceptionType {
  NOT_FOUND = 'Track with such id not found',
  INTERNAL_ERROR = 'Internal service error',
}

export class TrackServiceException extends Error {
  constructor(message: TrackServiceExceptionType) {
    super(message as string);
  }
}
