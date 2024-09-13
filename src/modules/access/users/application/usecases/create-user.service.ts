import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserDto } from '../../application/dtos/user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserResponse } from '../interfaces/create-user-response.interface';
import { ICreateUserService } from './interfaces/create-user.service.interface';
import { IFindByUserNameService } from './interfaces/find-by-user-name.service.interface';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class CreateUserService implements ICreateUserService{
  constructor(
    @Inject('IUserRepository') private readonly usersRepository: IUserRepository,
    @Inject('IFindByUserNameService') private readonly findByUserNameService: IFindByUserNameService,
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
