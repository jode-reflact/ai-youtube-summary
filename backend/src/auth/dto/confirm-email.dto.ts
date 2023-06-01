import { IsString } from 'class-validator';

class ConfirmEmailDto {
  @IsString()
  userId: string;

  @IsString()
  confirmationToken: string;
}

export { ConfirmEmailDto };
