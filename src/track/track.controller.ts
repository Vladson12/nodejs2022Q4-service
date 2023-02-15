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
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { ErrorsInterceptor } from 'src/errors/errors.interceptor';

@UseInterceptors(ErrorsInterceptor)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() dto: TrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  async getAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: TrackDto,
  ) {
    return this.trackService.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.deleteById(id);
  }
}
