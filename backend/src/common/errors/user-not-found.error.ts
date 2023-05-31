import { BusinessError } from './business.error';

class UserNotFoundError extends BusinessError {
  constructor(email: string) {
    super(`User with email ${email} not found`, 'USER_NOT_FOUND');
  }
}

export { UserNotFoundError };
