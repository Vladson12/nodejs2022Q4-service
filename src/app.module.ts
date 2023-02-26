import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { LoggerMiddleware } from './logging/logger.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
