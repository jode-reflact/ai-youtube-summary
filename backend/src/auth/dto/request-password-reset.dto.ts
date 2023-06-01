import { IsString } from 'class-validator';

class RequestPasswordResetDto {
  @IsString()
  email: string;
}

export { RequestPasswordResetDto };
