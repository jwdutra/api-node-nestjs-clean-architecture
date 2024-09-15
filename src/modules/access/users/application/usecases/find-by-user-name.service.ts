import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { IFindByUserNameService } from './interfaces/find-by-user-name.service.interface';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class FindByUserNameService implements IFindByUserNameService {
  constructor(
    @Inject('IUserRepository') private readonly usersRepository: IUserRepository,
  ) {}

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findUser(username);

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
