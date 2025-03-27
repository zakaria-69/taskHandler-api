import { AuthRepository } from '../auth.repository';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../../users/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser(email, name);
    const auth = await this.authRepository.createAuth(user.id, hashedPassword);

    return auth;
  }
}
