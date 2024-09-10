import { ConflictException, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserResponse, UserDto } from '../../data/dtos/user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { FindByUserNameService } from './findbyusername.service';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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

    const { id, username } = await this.usersRepository.save(dbUser);
    return { id, username };
  }


}
