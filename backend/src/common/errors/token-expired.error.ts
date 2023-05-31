import { BusinessError } from './business.error';

class TokenExpiredError extends BusinessError {
  constructor() {
    super('Token expired', 'TOKEN_EXPIRED');
  }
}

export { TokenExpiredError };
