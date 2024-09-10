import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import {  UserDto } from '../../application/dtos/user.dto';

@Injectable()
export class FindByUserNameService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

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
