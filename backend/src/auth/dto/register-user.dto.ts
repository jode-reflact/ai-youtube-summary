import { IsString } from 'class-validator';

class RegisterUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export { RegisterUserDto };
