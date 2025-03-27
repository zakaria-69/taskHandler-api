import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserRepository } from './users.repository';

@Module({
  imports: [],
  exports: [],
  providers: [UserResolver, UserRepository],
})
export class UserModule {}
