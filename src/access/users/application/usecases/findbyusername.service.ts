import { Injectable } from '@nestjs/common';
import { UserDto } from '../../application/dtos/user.dto';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';

@Injectable()
export class FindByUserNameService {
  constructor(
    private usersRepository: TypeOrmUserRepository,
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
