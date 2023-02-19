import {
  Body,
  ClassSerializerInterceptor,
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
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';

@UseInterceptors(ErrorsInterceptor, ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() dto: ArtistDto) {
    return this.artistService.create(dto);
  }

  @Get()
  async getAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ArtistDto,
  ) {
    return this.artistService.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.deleteById(id);
  }
}
