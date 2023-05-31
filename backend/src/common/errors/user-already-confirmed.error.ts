import { BusinessError } from './business.error';

class UserAlreadyConfirmedError extends BusinessError {
  constructor(email: string) {
    super(
      `User with email ${email} is already confirmed`,
      'USER_ALREADY_CONFIRMED',
    );
  }
}

export { UserAlreadyConfirmedError };
