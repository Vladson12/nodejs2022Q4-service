import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendFile, mkdir, readdir, statSync, writeFile } from 'fs';
import { resolve } from 'path';
import { EOL } from 'os';

@Injectable()
export class MyLogger extends ConsoleLogger {
  constructor(private logLevels: string[]) {
    super();
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

    const pathToDirectory = resolve(process.cwd(), logType);
    const timestamp = new Date().toLocaleString();

    const dataToWrite = `${timestamp} [${logType.toLocaleUpperCase()}] ${message}${EOL}`;

    readdir(pathToDirectory, (err, files) => {
      if (err) {
        mkdir(pathToDirectory, () => {
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
        const lastFileStats = statSync(resolve(logType));

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
