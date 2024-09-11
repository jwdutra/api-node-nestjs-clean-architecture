import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/access/users/domain/entities/user.entity';
import { UsersController } from './application/controllers/users.controller';
import { CreateUserService } from './application/usecases/createuser.service';
import { FindByUserNameService } from './application/usecases/findbyusername.service';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    CreateUserService, 
    FindByUserNameService, 
    UserRepository],
  exports: [
    CreateUserService, 
    FindByUserNameService, 
    UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
