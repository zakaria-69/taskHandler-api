import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/Auth';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authRepository: AuthRepository) {}

  @Query(() => Auth, { nullable: true })
  async getAuthById(@Args('id') id: string): Promise<Auth | null> {
    return this.authRepository.findByUserId(id);
  }
}
