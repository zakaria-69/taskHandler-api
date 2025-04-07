import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';

@Injectable()
export class LogoutUserUSeCase {
  constructor(private readonly authrepository: AuthRepository) {}

  async execute(userId: string): Promise<void> {
    await this.authrepository.deleteTokensByUserId(userId);
  }
}
