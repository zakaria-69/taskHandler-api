import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthDTO } from './dto/Auth.dto';
import { AuthRepository } from './auth.repository';
import { CreateUserUseCase } from './useCase/createUseUseCase';
import { LoginUserUseCase } from './useCase/loginUserUseCase';
import { RefreshTokenUseCase } from './useCase/refreshTokenUseCase';
@Resolver(() => AuthDTO)
export class AuthResolver {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
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
}
