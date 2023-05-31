import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';

import { EnvironmentVariables } from '../config/environment-variables';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = this.configService.get('JWT_SECRET', {
    infer: true,
  });
  private readonly ACCESS_TOKEN_EXPIRES_IN = this.configService.get(
    'ACCESS_TOKEN_EXPIRES_IN',
    { infer: true },
  );
  private readonly REFRESH_TOKEN_EXPIRES_IN = this.configService.get(
    'REFRESH_TOKEN_EXPIRES_IN',
    { infer: true },
  );

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  hash(password: string) {
    return argon2.hash(password);
  }

  verifyHashes(plain: string, hash: string) {
    return argon2.verify(plain, hash);
  }

  generateToken() {
    return randomUUID();
  }

  async generateLoginTokens({
    userId,
    email,
  }: {
    userId: string;
    email: string;
  }) {
    const tokenPayload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(tokenPayload),
      this.generateRefreshToken(tokenPayload),
    ]);

    return { accessToken, refreshToken };
  }

  private generateAccessToken(payload: { sub: string; email: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      secret: this.JWT_SECRET,
    });
  }

  private generateRefreshToken(payload: { sub: string; email: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      secret: this.JWT_SECRET,
    });
  }
}
