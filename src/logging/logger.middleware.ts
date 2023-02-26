import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    res.on('finish', () => {
      this.logger.log(
        `method: ${method}, status code: ${
          res.statusCode
        }, url: ${url}, query params: ${JSON.stringify(
          query,
        )}, body: ${JSON.stringify(body)}`,
      );
    });
    next();
  }
}
