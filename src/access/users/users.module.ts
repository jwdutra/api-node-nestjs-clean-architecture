import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/access/users/domain/entities/user.entity';
import { UsersController } from './presenter/users.controller';
import { CreateUserService } from './domain/use_cases/createuser.service';
import { FindByUserNameService } from './domain/use_cases/findbyusername.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    CreateUserService,
    FindByUserNameService,
  ],
  exports: [
    CreateUserService,
    FindByUserNameService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
