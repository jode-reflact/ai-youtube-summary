export interface UserCredentialsRequestBody {
  email: string;
  password: string;
}

export interface AuthSuccessResponseBody {
  accessToken: string;
  refreshToken: string;
}

export interface ConfirmRequestBody {
  userId: string;
  confirmationToken: string;
}

export interface UserEmailRequestBody {
  email: string;
}

export interface ResetPasswordRequestBody {
  userId: string;
  passwordResetToken: string;
  newPassword: string;
}

export interface AuthHeaders {
  Authorization: string;
}
