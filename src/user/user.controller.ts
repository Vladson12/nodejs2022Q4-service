import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { ErrorsInterceptor } from 'src/errors/errors.interceptor';

@UseInterceptors(ErrorsInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updatePasswordById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updatePasswordById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteById(id);
  }
}
