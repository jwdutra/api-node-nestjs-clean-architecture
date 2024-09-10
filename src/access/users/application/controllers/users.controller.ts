import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserResponse, UserDto } from '../../data/dtos/user.dto';
import { CreateUserService } from '../../domain/use_cases/createuser.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService:CreateUserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<CreateUserResponse> {
    return await this.usersService.createUser(user);
  }
}
