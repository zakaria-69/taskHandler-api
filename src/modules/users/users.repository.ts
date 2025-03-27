import { PrismaClient } from '@prisma/client';

export class UserRepository {
  private prisma = new PrismaClient();

  async createUser(email: string, name: string) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
      },
      include: { auth: true },
    });
  }
}
