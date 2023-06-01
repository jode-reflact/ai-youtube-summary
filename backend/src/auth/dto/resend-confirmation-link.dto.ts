import { IsString } from 'class-validator';

class ResendConfirmationLinkDto {
  @IsString()
  email: string;
}

export { ResendConfirmationLinkDto };
