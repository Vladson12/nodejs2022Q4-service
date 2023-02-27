/* eslint-disable @typescript-eslint/no-empty-function */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendFile, mkdir, readdir, statSync, writeFile } from 'fs';
import { resolve } from 'path';
import { EOL } from 'os';
import { logLevels as logLvls } from './logger.levels';

@Injectable()
export class MyLogger extends ConsoleLogger {
  private logLevels: string[] = logLvls.slice(
    0,
    +process.env.APP_LOG_LEVEL || 5,
  );

  constructor(context: string) {
    super(context);
    this.setContext(context);

    process.on('uncaughtException', (error, origin) => {
      const message = `${error.message} origin: ${origin}`;
      const fileMessage = `error: ${error.message} origin: ${origin}${EOL}`;
      this.error(message, 'ERROR');
      this.logToFile('error', fileMessage);
    });

    process.on('unhandledRejection', (reason) => {
      const message = `Unhandled rejection: ${reason}`;
      const fileMessage = `${message}${EOL}`;
      this.error(message, 'ERROR');
      this.logToFile('error', fileMessage);
    });
  }

  log(message: any, context?: string): void {
    if (this.logLevels.includes('log')) {
      super.log(message, context);
    }
  }

  error(message: any, context?: string): void {
    if (this.logLevels.includes('error')) {
      super.error(message, context);
    }
  }

  warn(message: any, context?: string): void {
    if (this.logLevels.includes('warn')) {
      super.warn(message, context);
    }
  }

  debug(message: any, context?: string): void {
    if (this.logLevels.includes('debug')) {
      super.debug(message, context);
    }
  }

  verbose(message: any, context?: string): void {
    if (this.logLevels.includes('verbose')) {
      super.verbose(message, context);
    }
  }

  logToFile(logType: 'log' | 'error', message: string) {
    if (!this.logLevels.includes(logType)) {
      return;
    }

    const pathToDirectory = resolve(process.cwd(), 'logs', logType);
    const timestamp = new Date().toLocaleString();

    const dataToWrite = `${timestamp} [${logType.toLocaleUpperCase()}] ${message}${EOL}`;

    readdir(pathToDirectory, (err, files) => {
      if (err) {
        mkdir(pathToDirectory, { recursive: true }, () => {
          writeFile(
            resolve(pathToDirectory, `${logType}-${Date.now()}.log`),
            dataToWrite,
            'utf-8',
            () => {},
          );
        });

        return;
      }

      if (files) {
        const lastFile = files[files.length - 1];
        const lastFileStats = statSync(resolve(pathToDirectory, lastFile));

        if (lastFileStats.size < +process.env.LOG_FILE_SIZE * 1024) {
          appendFile(
            resolve(pathToDirectory, lastFile),

            dataToWrite,
            'utf-8',
            () => {},
          );
        } else {
          appendFile(
            resolve(pathToDirectory, `${logType}-${Date.now()}.log`),
            dataToWrite,
            'utf-8',
            () => {},
          );
        }
      }
    });
  }
}
