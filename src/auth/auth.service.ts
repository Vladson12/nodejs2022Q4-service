import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { TokenPayload, Tokens } from './types/token.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(user: CreateUserDto) {
    const hashedPassword = await hash(user.password, +process.env.CRYPT_SALT);

    const currentTimestamp = Date.now();
    const userToCreate = new User({
      ...user,
      password: hashedPassword,
      version: 1,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    const createdUser = this.usersRepository.create(userToCreate);
    return this.usersRepository.save(createdUser);
  }

  async login(user: CreateUserDto): Promise<Tokens> {
    const foundUser = await this.usersRepository.findOne({
      where: { login: user.login },
    });
    if (!foundUser) {
      throw new ForbiddenException("User with such login doesn't exist");
    }
    const isPasswordCorrect = await compare(user.password, foundUser.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Wrong password');
    }

    const { accessToken, refreshToken } = await this.getTokens({
      userId: foundUser.id,
      login: foundUser.login,
    });

    return { accessToken, refreshToken };
  }

  private async getTokens(payload: TokenPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
