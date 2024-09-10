import { ConflictException, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserDto } from '../../application/dtos/user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { FindByUserNameService } from './findbyusername.service';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';
import { CreateUserResponse } from '../interfaces/create-user-response.interface';

@Injectable()
export class CreateUserService {
  constructor(
    private usersRepository: TypeOrmUserRepository,
    private findByUserNameService: FindByUserNameService,
  ) {}

  async createUser(newUser: UserDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = await this.findByUserNameService.findByUserName(newUser.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${newUser.username}' already registered`,
      );
    }

    const dbUser = new UserEntity();
    dbUser.username = newUser.username;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, username } = await this.usersRepository.saveUser(dbUser);
    return { id, username };
  }


}
