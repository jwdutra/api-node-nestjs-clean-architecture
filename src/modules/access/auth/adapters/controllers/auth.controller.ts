import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IAuthService } from '../../application/use_cases/interfaces/auth.service.interface';
import { AuthResponseDto } from '../../application/dtos/auth.dto';

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
