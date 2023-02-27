import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(user: CreateUserDto) {
    const hashedPassword = await hash(user.password, +process.env.CRYPT_SALT);
    return this.userService.create({ ...user, password: hashedPassword });
  }
}
