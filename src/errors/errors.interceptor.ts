import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  UserServiceException,
  UserServiceExceptionType,
} from 'src/user/exceptions/user-service-exception';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        let finalException: HttpException;
        if (err instanceof UserServiceException) {
          switch (err.message) {
            case UserServiceExceptionType.NOT_FOUND:
              finalException = new NotFoundException(err.message);
              break;
            case UserServiceExceptionType.CREDENTIALS_WRONG:
              finalException = new ForbiddenException(err.message);
              break;
            default:
              finalException = new InternalServerErrorException();
          }
        }
        if (!finalException) {
          return throwError(() => err);
        }
        return throwError(() => finalException);
      }),
    );
  }
}
