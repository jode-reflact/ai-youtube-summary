import { IsString } from 'class-validator';

class PasswordResetDto {
  @IsString()
  userId: string;

  @IsString()
  passwordResetToken: string;

  @IsString()
  newPassword: string;
}

export { PasswordResetDto };
