import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findUser(username: string): Promise<UserEntity | null>;
  saveUser(newUser: UserEntity): Promise<UserEntity>;
}