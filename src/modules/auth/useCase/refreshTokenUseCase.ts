import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from '../auth.repository';
import { AuthDTO } from '../../auth/dto/Auth.dto';
import { JwtPayload } from '../../../commons/interfaces/jwt-payload.interface';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<AuthDTO> {
    try {
      console.log('Verifying refresh token:', refreshToken);
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      console.log('Decoded refresh token:', decoded);

      if (this.isJwtPayload(decoded)) {
        const userId = decoded.userId;
        console.log('User ID extracted:', userId);
        const accessToken = jwt.sign(
          { userId },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '15m',
          },
        );
        console.log('New access token generated:', accessToken);
        const newRefreshToken = jwt.sign(
          { userId },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '7d',
          },
        );
        console.log('New refresh token generated:', newRefreshToken);

        await this.authRepository.updateTokens(
          userId,
          newRefreshToken,
          accessToken,
        );
        console.log('Tokens updated in the database.');
        const user = await this.authRepository.findUserById(userId);
        if (!user) throw new Error('User not found');
        console.log('User found:', user);

        const authDTO = new AuthDTO();
        authDTO.id = user.auth.id;
        authDTO.userId = user.id;
        authDTO.refreshToken = newRefreshToken;
        authDTO.accessToken = accessToken;
        authDTO.createdAt = user.auth.createdAt;
        authDTO.updatedAt = user.auth.updatedAt;
        authDTO.user = user;

        return authDTO;
      }

      throw new Error('Invalid refresh token');
    } catch (error) {
      console.error(error);
      throw new Error('Could not refresh token');
    }
  }

  private isJwtPayload(decoded: any): decoded is JwtPayload {
    return (
      typeof decoded === 'object' && decoded !== null && 'userId' in decoded
    );
  }
}
