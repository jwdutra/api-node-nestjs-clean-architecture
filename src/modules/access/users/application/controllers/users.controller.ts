import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { CreateUserService } from '../usecases/create-user.service';
import { CreateUserResponse } from '../interfaces/create-user-response.interface';
import { ICreateUserService } from '../usecases/interfaces/create-user.service.interface';


@Controller('users')
export class UsersController {
  constructor(
    @Inject('ICreateUserService') private readonly usersService: ICreateUserService,
  ) {}

  @Post()
  async create(@Body() user: UserDto): Promise<CreateUserResponse> {
    return await this.usersService.createUser(user);
  }
}
