import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from '../dtos/auth.dto';
import { FindByUserNameService } from 'src/access/users/application/usecases/findbyusername.service';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByUsername: FindByUserNameService,
    private readonly authRepository: AuthRepository,
  ) {}

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.findUserByUsername.findByUserName(username);
    if (
      !foundUser ||
      !this.authRepository.bcryptCompare(password, foundUser.password)
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };
    return this.authRepository.jwtSign(payload);
  }
}
