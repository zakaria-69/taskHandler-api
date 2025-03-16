import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Auth } from './entities/Auth';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Auth | null> {
    const prismaAuth = await this.prisma.auth.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            clients: true,
            subscription: true,
          },
        },
      },
    });

    if (!prismaAuth) {
      return null;
    }

    const auth = new Auth();
    Object.assign(auth, {
      ...prismaAuth,
      user: {
        ...prismaAuth.user,
        clients: prismaAuth.user.clients || [],
      },
    });
    return auth;
  }
}
