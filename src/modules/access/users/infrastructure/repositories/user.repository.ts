import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../persistence-entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findUser(username: string): Promise<UserEntity | null> {
    return await this.repository.findOne({
      where: { username },
    });
  }

  async saveUser(newUser: UserEntity): Promise<UserEntity> {
    return await this.repository.save(newUser);
  }
}
