import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repositorie';
import { CreateUserResponse, UserDto } from '../../application/dtos/user.dto';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  
  async findByUserName(username: string): Promise<UserDto | null> {
    return null
    //return await this.repository.findOne({
    //  where: { username },
    //});
  }
  

  async createUser(newUser: UserDto): Promise<CreateUserResponse> {
    return await this.findByUserName(newUser.username);
  }

}