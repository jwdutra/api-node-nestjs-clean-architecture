import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from '../dtos/auth.dto';
import { FindByUserNameService } from 'src/modules/access/users/application/usecases/find-by-user-name.service';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByUsername: FindByUserNameService,
    @Inject('IAuthRepository') private readonly authRepository: IAuthRepository,
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
