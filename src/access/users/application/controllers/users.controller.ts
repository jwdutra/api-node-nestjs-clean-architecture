import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserResponse, UserDto } from '../dtos/user.dto';
import { CreateUserService } from '../usecases/createuser.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService:CreateUserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<CreateUserResponse> {
    return await this.usersService.createUser(user);
  }
}
