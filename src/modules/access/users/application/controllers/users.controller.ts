import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { CreateUserService } from '../usecases/create-user.service';
import { CreateUserResponse } from '../interfaces/create-user-response.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService:CreateUserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<CreateUserResponse> {
    return await this.usersService.createUser(user);
  }
}
