import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Album } from 'src/album/album.model';
import { Favorites } from './favorites.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.model';
import { Track } from 'src/track/track.model';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track, Favorites])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
