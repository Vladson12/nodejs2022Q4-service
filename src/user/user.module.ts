import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InMemoryDbService } from '../db/in-memory-db.service';

@Module({
  imports: [InMemoryDbService],
  controllers: [UserController],
  providers: [UserService, InMemoryDbService],
})
export class UserModule {}
