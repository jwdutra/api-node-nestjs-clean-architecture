import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './application/controllers/users.controller';
import { CreateUserService } from './application/usecases/create-user.service';
import { FindByUserNameService } from './application/usecases/find-by-user-name.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserEntity } from './domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: 'ICreateUserService', useClass: CreateUserService, },
    { provide: 'IFindByUserNameService', useClass: FindByUserNameService, },
    FindByUserNameService, 
    { provide: 'IUserRepository', useClass: UserRepository, },
  ],
  exports: [
    FindByUserNameService, 
  ],
  controllers: [UsersController],
})
export class UsersModule {}
