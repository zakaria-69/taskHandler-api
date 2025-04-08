import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthDTO } from './dto/Auth.dto';
import { AuthRepository } from './auth.repository';
import { CreateUserUseCase } from './useCase/createUseUseCase';
import { LoginUserUseCase } from './useCase/loginUserUseCase';
import { RefreshTokenUseCase } from './useCase/refreshTokenUseCase';
import { LogoutUserUSeCase } from './useCase/logoutUserUseCase';
import { CurrentUser } from '../../commons/decorators/CurrentUser';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
@Resolver(() => AuthDTO)
export class AuthResolver {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUserUSeCase: LogoutUserUSeCase,
  ) {}

  @Mutation(() => AuthDTO)
  async register(
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('password') password: string,
  ) {
    return await this.createUserUseCase.execute(email, name, password);
  }

  @Mutation(() => AuthDTO)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.loginUserUseCase.execute(email, password);
  }

  @Mutation(() => AuthDTO)
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<AuthDTO> {
    return this.refreshTokenUseCase.execute(refreshToken);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async logout(@CurrentUser() user: { userId: string }) {
    // console.log('User ID in logout:', user.userId);
    await this.logoutUserUSeCase.execute(user.userId);
    return true;
  }
}
