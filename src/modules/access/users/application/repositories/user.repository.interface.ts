import { UserEntity } from "../../domain/entities/user.entity";

export interface IUserRepository {
  findUser(username: string): Promise<UserEntity | null>;
  saveUser(newUser: UserEntity): Promise<UserEntity>;
}
