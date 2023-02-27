import {
  Controller,
  Post,
  Body,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.model';
import { Tokens } from './types/token.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  signup(@Body() user: CreateUserDto): Promise<User> {
    return this.authService.register(user);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() user: CreateUserDto): Promise<Tokens> {
    return this.authService.login(user);
  }
}
