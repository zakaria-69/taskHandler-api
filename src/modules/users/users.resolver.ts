// import { Resolver, Query } from '@nestjs/graphql';
// import User from './entities/User';
// import { UserRepository } from './users.repository';

// @Resolver(() => User)
// export class UserResolver {
//   constructor(private userRepository: UserRepository) {}

//   @Query(() => [User])
//   async getUsers(): Promise<User[]> {
//     const users = await this.userRepository.findAll();
//     return users.map((user) => ({
//       ...user,
//       nbrsProjects: user.nbrProjects,
//       clients: [], // TODO: Add clients data if needed
//     }));
//   }

//   @Query(() => User, { nullable: true })
//   async getUserById(@Args('id') id: string): Promise<User | null> {
//     return this.userRepository.findById(id);
//   }

//   @Mutation(() => User)
//   async createUser(
//     @Args('email') email: string,
//     @Args('name') name: string,
//     @Args('isPremium') isPremium: boolean,
//   ): Promise<User> {
//     return this.userRepository.create(email, name, isPremium);
//   }
// }

import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}
