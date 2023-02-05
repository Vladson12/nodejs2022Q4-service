import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    DbModule,
  ],
})
export class AppModule {}
