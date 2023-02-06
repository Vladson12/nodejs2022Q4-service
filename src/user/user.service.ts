import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InMemoryDbService } from '../db/in-memory-db.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  UserServiceException,
  UserServiceExceptionType,
} from './exceptions/user-service-exception';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly dbService: InMemoryDbService) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.dbService.createUser(dto);
  }

  async findAll(): Promise<User[]> {
    return await this.dbService.findAllUsers();
  }

  async findById(id: string): Promise<User> {
    const foundUser = await this.dbService.findUserById(id);
    if (!foundUser) {
      throw new UserServiceException(UserServiceExceptionType.NOT_FOUND);
    }
    return foundUser;
  }

  async updatePasswordById(id: string, dto: UpdatePasswordDto): Promise<User> {
    const userToUpdate = await this.dbService.findUserById(id);

    if (!userToUpdate) {
      throw new UserServiceException(UserServiceExceptionType.NOT_FOUND);
    }

    if (!(userToUpdate.password === dto.oldPassword)) {
      throw new UserServiceException(
        UserServiceExceptionType.CREDENTIALS_WRONG,
      );
    }

    userToUpdate.password = dto.newPassword;

    const isUpdated = await this.dbService.updateUserById(
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

    const isDeleted = await this.dbService.deleteUserById(id);
    if (!isDeleted) {
      throw new UserServiceException(UserServiceExceptionType.INTERNAL_ERROR);
    }
  }
}
