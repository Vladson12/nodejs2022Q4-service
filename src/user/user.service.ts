import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const currentTimestamp = Date.now();

    const hashedPassword = await hash(
      dto.password,
      +this.configService.get('CRYPT_SALT'),
    );
    const userToCreate = new User({
      ...dto,
      password: hashedPassword,
      version: 1,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    const createdUser = this.usersRepository.create(userToCreate);
    return this.usersRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException('User with such id not found');
    }
    return foundUser;
  }

  async updatePasswordById(id: string, dto: UpdatePasswordDto): Promise<User> {
    const userToUpdate = await this.usersRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new NotFoundException('User with such id not found');
    }

    if (!(await compare(dto.oldPassword, userToUpdate.password))) {
      throw new ForbiddenException('Password wrong');
    }

    userToUpdate.password = await hash(
      dto.newPassword,
      +this.configService.get('CRYPT_SALT'),
    );
    userToUpdate.version++;
    userToUpdate.updatedAt = Date.now();

    return await this.usersRepository.save(userToUpdate);
  }

  async deleteById(id: string) {
    await this.findById(id);

    await this.usersRepository.delete(id);
  }
}
