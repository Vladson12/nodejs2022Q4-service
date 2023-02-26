import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    res.on('finish', () => {
      const message = `method: ${method}, status code: ${
        res.statusCode === 304 ? 200 : res.statusCode
      }, url: ${url}, query params: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(body)}`;

      if (res.statusCode < 400) {
        this.logger.log(message, 'HTTP');
        this.logger.logToFile('log', message);
      }
    });
    next();
  }
}
