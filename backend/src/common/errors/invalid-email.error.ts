import { BusinessError } from './business.error';

class InvalidEmailError extends BusinessError {
  constructor(email: string) {
    super(`Email ${email} is not valid.`, 'NO_VALID_EMAIL');
  }
}

export { InvalidEmailError };
