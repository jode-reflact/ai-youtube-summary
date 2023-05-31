import { BusinessError } from './business.error';

class InvalidPasswordError extends BusinessError {
  constructor(code: string) {
    super(`Password is not valid.`, `NO_VALID_PASSWORD_${code}`);
  }
}

export { InvalidPasswordError };
