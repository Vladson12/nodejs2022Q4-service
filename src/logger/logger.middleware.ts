import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';
import { logLevels } from './logger.levels';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new MyLogger(
    logLevels.slice(0, +process.env.APP_LOG_LEVEL || 5),
  );

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    res.on('finish', () => {
      const message = `method: ${method}, status code: ${
        res.statusCode
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
