import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthDTO } from '../dto/Auth.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly authrepository: AuthRepository) {}

  async execute(email: string, password: string) {
    const user = await this.authrepository.findUserByEmail(email);
    if (!user?.auth?.password) {
      throw new Error('Invalid credentials, login impossible !');
    }

    const isMatch = await bcrypt.compare(password, user.auth.password);
    if (!isMatch) {
      throw new Error('invalid credentials, login Impossible !');
    }

    try {
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '15m',
        },
      );
      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '7d',
        },
      );

      await this.authrepository.updateTokens(
        user.id,
        refreshToken,
        accessToken,
      );

      const authDTO = new AuthDTO();
      authDTO.id = user.auth.id;
      authDTO.userId = user.auth.userId;
      authDTO.refreshToken = user.auth.refreshToken;
      authDTO.accessToken = user.auth.accessToken;
      authDTO.updatedAt = user.auth.updatedAt;
      authDTO.createdAt = user.auth.createdAt;
      authDTO.user = user;

      return authDTO;

      // return {
      //   accessToken: accessToken,
      //   refreshToken: refreshToken,
      //   user,
      // };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        throw new Error('Token generation failed');
      }
      throw new Error('Unknown error occured');
    }
  }
}
