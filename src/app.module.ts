import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { InMemoryDbService } from './db/in-memory-db.service';
import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DbModule, TrackModule],
  providers: [InMemoryDbService],
})
export class AppModule {}
