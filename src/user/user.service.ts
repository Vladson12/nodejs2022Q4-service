import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  UserServiceException,
  UserServiceExceptionType,
} from './exceptions/user-service-exception';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const currentTimestamp = Date.now();
    const userToCreate = new User({
      ...dto,
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
      throw new UserServiceException(UserServiceExceptionType.NOT_FOUND);
    }
    return foundUser;
  }

  async updatePasswordById(id: string, dto: UpdatePasswordDto): Promise<User> {
    const userToUpdate = await this.usersRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new UserServiceException(UserServiceExceptionType.NOT_FOUND);
    }

    if (!(userToUpdate.password === dto.oldPassword)) {
      throw new UserServiceException(
        UserServiceExceptionType.CREDENTIALS_WRONG,
      );
    }

    userToUpdate.password = dto.newPassword;
    userToUpdate.updatedAt = Date.now();

    try {
      return await this.usersRepository.save(userToUpdate);
    } catch (err) {
      throw new UserServiceException(UserServiceExceptionType.INTERNAL_ERROR);
    }
  }

  async deleteById(id: string) {
    await this.findById(id);

    try {
      await this.usersRepository.delete(id);
    } catch (err) {
      throw new UserServiceException(UserServiceExceptionType.INTERNAL_ERROR);
    }
  }
}
