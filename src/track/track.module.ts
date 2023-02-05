import { Module } from '@nestjs/common';
import { InMemoryDbService } from 'src/db/in-memory-db.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [InMemoryDbService],
  controllers: [TrackController],
  providers: [TrackService, InMemoryDbService],
})
export class TrackModule {}
