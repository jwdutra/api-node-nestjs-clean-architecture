import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ICreateUserService } from '../../application/usecases/interfaces/create-user.service.interface';
import { UserDto } from '../../application/dtos/user.dto';
import { CreateUserResponse } from '../../application/interfaces/create-user-response.interface';

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
