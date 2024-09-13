import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../application/repositories/user.repository.interface';

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
