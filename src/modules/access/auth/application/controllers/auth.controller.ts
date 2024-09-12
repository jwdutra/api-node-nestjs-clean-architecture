import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthResponseDto } from '../dtos/auth.dto';
import { AuthService } from '../use_cases/auth.service';
import { IAuthService } from '../use_cases/interfaces/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<AuthResponseDto> {
    return this.authService.signIn(username, password);
  }
}
