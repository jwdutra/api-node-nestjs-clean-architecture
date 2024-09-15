import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from '../dtos/auth.dto';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { IFindByUserNameService } from 'src/modules/access/users/application/usecases/interfaces/find-by-user-name.service.interface';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService{
  constructor(
    @Inject('IFindByUserNameService') private readonly findByUserNameService: IFindByUserNameService,
    @Inject('IAuthRepository') private readonly authRepository: IAuthRepository,
  ) {}

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.findByUserNameService.findByUserName(username);
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
