import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthService } from './application/use_cases/auth.service';
import { AuthController } from './adapters/controllers/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'IAuthService', useClass: AuthService, },
    { provide: 'IAuthRepository', useClass: AuthRepository },
  ],
  exports: [],
})
export class AuthModule {}
