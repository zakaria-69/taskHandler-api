import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { AuthResolver } from './auth.resolver';
import { CreateUserUseCase } from './useCase/createUseUseCase';
import { UserRepository } from '../users/users.repository';
import { LoginUserUseCase } from './useCase/loginUserUseCase';
import { RefreshTokenUseCase } from './useCase/refreshTokenUseCase';
@Module({
  imports: [],

  providers: [
    AuthRepository,
    AuthResolver,
    PrismaService,
    CreateUserUseCase,
    UserRepository,
    LoginUserUseCase,
    RefreshTokenUseCase,
  ],
  exports: [
    AuthRepository,
    CreateUserUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
