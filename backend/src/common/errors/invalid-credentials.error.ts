import { BusinessError } from './business.error';

class InvalidCredentialsError extends BusinessError {
  constructor() {
    super('Wrong email or password', 'INVALID_CREDENTIALS');
  }
}

export { InvalidCredentialsError };
