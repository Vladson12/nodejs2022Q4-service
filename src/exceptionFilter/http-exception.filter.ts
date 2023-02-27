import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { MyLogger } from 'src/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: MyLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const path = httpAdapter.getRequestUrl(request);
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date(),
      path,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    const errMessage = `method: ${
      request.method
    }, status code: ${httpStatus}, url: ${
      request.url
    }, query params: ${JSON.stringify(request.query)}, body: ${JSON.stringify(
      request.body,
    )}`;
    this.logger.error(errMessage, 'HTTP');
    this.logger.logToFile('error', errMessage);
  }
}
