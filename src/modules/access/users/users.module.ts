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
    CreateUserService, 
    FindByUserNameService, 
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    FindByUserNameService, 
    'IUserRepository',
  ],
  controllers: [UsersController],
})
export class UsersModule {}
