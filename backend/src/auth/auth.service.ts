import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  hashPassword(password: string) {
    return argon2.hash(password);
  }

  generateToken() {
    return randomUUID();
  }
}
