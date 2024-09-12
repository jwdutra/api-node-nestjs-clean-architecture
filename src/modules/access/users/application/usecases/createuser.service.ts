import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserDto } from '../../application/dtos/user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { FindByUserNameService } from './findbyusername.service';
import { CreateUserResponse } from '../interfaces/create-user-response.interface';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUserRepository') private readonly usersRepository: IUserRepository,
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
