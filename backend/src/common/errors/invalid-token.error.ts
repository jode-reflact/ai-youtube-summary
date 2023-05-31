import { BusinessError } from './business.error';

class InvalidTokenError extends BusinessError {
  constructor() {
    super('Invalid token', 'INVALID_TOKEN');
  }
}

export { InvalidTokenError };
