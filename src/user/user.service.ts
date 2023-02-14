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
    const userToCreate = new User({
      ...dto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
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

    const isUpdated = await this.usersRepository.update(
      userToUpdate.id,
      userToUpdate,
    );

    if (!isUpdated) {
      throw new UserServiceException(UserServiceExceptionType.INTERNAL_ERROR);
    }

    return this.findById(userToUpdate.id);
  }

  async deleteById(id: string) {
    const userToDelete = await this.findById(id);
    if (!userToDelete) {
      throw new UserServiceException(UserServiceExceptionType.NOT_FOUND);
    }

    const isDeleted = await this.usersRepository.delete(userToDelete.id);
    if (!isDeleted) {
      throw new UserServiceException(UserServiceExceptionType.INTERNAL_ERROR);
    }
  }
}
