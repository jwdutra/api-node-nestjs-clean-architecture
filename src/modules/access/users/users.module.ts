import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserService } from './application/usecases/create-user.service';
import { FindByUserNameService } from './application/usecases/find-by-user-name.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UsersController } from './adapters/controllers/users.controller';
import { UserEntity } from './infrastructure/persistence-entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: 'ICreateUserService', useClass: CreateUserService, },
    { provide: 'IFindByUserNameService', useClass: FindByUserNameService, },
    { provide: 'IUserRepository', useClass: UserRepository, },
  ],
  exports: [
    { provide: 'IFindByUserNameService', useClass: FindByUserNameService, },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
