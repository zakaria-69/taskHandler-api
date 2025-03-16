import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [],
  providers: [AuthRepository, AuthResolver, PrismaService],
  exports: [AuthRepository],
})
export class AuthModule {}
