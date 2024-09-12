import { Injectable } from '@nestjs/common';
import { UserDto } from '../../application/dtos/user.dto';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@Injectable()
export class FindByUserNameService {
  constructor(
    private usersRepository: UserRepository,
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
