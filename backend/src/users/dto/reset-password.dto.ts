import { IsString } from 'class-validator';

class PasswordResetDto {
  @IsString()
  passwordResetToken: string;

  @IsString()
  newPassword: string;
}

export { PasswordResetDto };
