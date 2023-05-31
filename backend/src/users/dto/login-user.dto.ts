import { IsString } from 'class-validator';

class LoginUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export { LoginUserDto };
