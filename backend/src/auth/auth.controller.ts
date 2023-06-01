import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ResendConfirmationLinkDto } from './dto/resend-confirmation-link.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { PasswordResetDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('confirm')
  confirmEmail(@Body() { userId, confirmationToken }: ConfirmEmailDto) {
    return this.authService.confirmEmail(userId, confirmationToken);
  }

  @Post('resend-confirmation-link')
  resendConfirmationLink(@Body() { email }: ResendConfirmationLinkDto) {
    return this.authService.resendConfirmationLink(email);
  }

  @Post('request-password-reset')
  requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.authService.requestPasswordReset(requestPasswordResetDto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() passwordResetDto: PasswordResetDto) {
    return this.authService.resetPassword(passwordResetDto);
  }
}
