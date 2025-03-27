import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthDTO } from './dto/Auth.dto';
import { AuthRepository } from './auth.repository';
import { CreateUserUseCase } from './useCase/createUseUseCase';
import { LoginUserUseCase } from './useCase/loginUserUseCase';
@Resolver(() => AuthDTO)
export class AuthResolver {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
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
}
