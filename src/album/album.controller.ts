import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorsInterceptor } from 'src/errors/errors.interceptor';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@UseInterceptors(ErrorsInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() dto: AlbumDto) {
    return this.albumService.create(dto);
  }

  @Get()
  async getAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AlbumDto,
  ) {
    return this.albumService.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.deleteById(id);
  }
}
