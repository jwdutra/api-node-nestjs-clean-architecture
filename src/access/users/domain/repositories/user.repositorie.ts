import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { CreateUserResponse, UserDto } from '../../application/dtos/user.dto';

export interface UserRepository {
  createUser(newUser: UserDto): Promise<CreateUserResponse>;
  findByUserName(username: string): Promise<UserDto | null>;
}