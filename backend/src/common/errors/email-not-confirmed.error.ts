import { BusinessError } from './business.error';

class EmailNotConfirmedError extends BusinessError {
  constructor(email: string) {
    super(`Email '${email}' not confirmed`, 'EMAIL_NOT_CONFIRMED');
  }
}

export { EmailNotConfirmedError };
