import { IsString } from 'class-validator';

class ConfirmEmailDto {
  @IsString()
  confirmationToken: string;
}

export { ConfirmEmailDto };
