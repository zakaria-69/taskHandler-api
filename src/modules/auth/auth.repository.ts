import { PrismaClient } from '@prisma/client';

export class AuthRepository {
  prisma = new PrismaClient();

  async createAuth(userId: string, hashedPassword: string) {
    return await this.prisma.auth.create({
      data: {
        userId,
        password: hashedPassword,
      },
      include: {
        user: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: { auth: true },
    });
  }

  async updateTokens(
    userId: string,
    refreshToken: string,
    accessToken: string,
  ) {
    return await this.prisma.auth.update({
      where: { userId },
      data: { refreshToken, accessToken },
    });
  }
}
