import { BusinessError } from './business.error';

export class EmailTakenError extends BusinessError {
  constructor(email: string) {
    super(`Email ${email} is already taken.`, 'EMAIL_TAKEN');
  }
}
