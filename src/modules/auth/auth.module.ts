import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { AuthResolver } from './auth.resolver';
import { CreateUserUseCase } from './useCase/createUseUseCase';
import { UserRepository } from '../users/users.repository';
import { LoginUserUseCase } from './useCase/loginUserUseCase';
import { RefreshTokenUseCase } from './useCase/refreshTokenUseCase';
import { LogoutUserUSeCase } from './useCase/logoutUserUseCase';
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
    LogoutUserUSeCase,
  ],
  exports: [
    AuthRepository,
    CreateUserUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
    LogoutUserUSeCase,
  ],
})
export class AuthModule {}
