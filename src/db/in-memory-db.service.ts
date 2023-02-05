import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryDbService {
  readonly users: User[] = [];

  async findAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const newUserUUID = uuidv4();
    const timestamp = Date.now();

    const newUser: User = {
      id: newUserUUID,
      createdAt: timestamp,
      updatedAt: timestamp,
      version: 1,
      ...dto,
    };
    this.users.push(newUser);
    return this.findUserById(newUserUUID);
  }

  async findUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async updateUserById(id: string, dto: Omit<User, 'id'>): Promise<boolean> {
    const userToUpdate = this.users.find((user) => user.id === id);
    if (!userToUpdate) return false;
    Object.assign(userToUpdate, dto);
    userToUpdate.version++;
    userToUpdate.updatedAt = Date.now();
    return true;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }
}
