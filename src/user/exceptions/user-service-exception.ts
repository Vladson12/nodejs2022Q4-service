export enum UserServiceExceptionType {
  NOT_FOUND = 'User with such id not found',
  CREDENTIALS_WRONG = 'Password wrong',
  INTERNAL_ERROR = 'Internal service error',
}

export class UserServiceException extends Error {
  constructor(message: UserServiceExceptionType) {
    super(message as string);
  }
}
