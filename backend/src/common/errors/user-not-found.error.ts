import { BusinessError } from './business.error';

class UserNotFoundError extends BusinessError {
  constructor(identifier: string) {
    super(`User not found with identifier ${identifier}`, 'USER_NOT_FOUND');
  }
}

export { UserNotFoundError };
