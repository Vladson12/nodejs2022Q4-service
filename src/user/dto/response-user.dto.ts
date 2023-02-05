import { User } from '../user.model';

export type ResponseUserDto = Omit<User, 'password'>;
