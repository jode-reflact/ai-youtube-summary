import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { RefreshTokenPayload } from '../types/refresh-token-payload';
import { EnvironmentVariables } from '../../config/environment-variables';

@Injectable()
class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET', { infer: true }),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: RefreshTokenPayload) {
    const refreshToken = req
      ?.get('Authorization')
      ?.replace('Bearer ', '')
      ?.trim();

    if (!refreshToken) throw new BadRequestException('Refresh token not found');

    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}

export { RefreshTokenStrategy };
