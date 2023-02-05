import { Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';

@Module({})
export class DbModule {
  exports: [InMemoryDbService];
}
