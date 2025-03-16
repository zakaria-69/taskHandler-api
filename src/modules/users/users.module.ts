import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';

@Module({
  imports: [],
  exports: [],
  providers: [UserResolver],
})
export class UserModule {}
