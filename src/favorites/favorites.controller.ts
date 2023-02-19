import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorsInterceptor } from 'src/errors/errors.interceptor';
import { FavoritesService } from './favorites.service';

@UseInterceptors(ErrorsInterceptor, ClassSerializerInterceptor)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('/artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Post('/album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/track/:id')
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/artist/:id')
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteArtist(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/album/:id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }
}
