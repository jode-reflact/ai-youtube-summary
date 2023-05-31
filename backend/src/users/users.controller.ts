import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { PasswordResetDto } from './dto/reset-password.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('users')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Patch('users/:id/confirm')
  confirmEmail(
    @Param('id') userId: string,
    @Body() confirmEmailDto: ConfirmEmailDto,
  ) {
    return this.usersService.confirmEmail(
      userId,
      confirmEmailDto.confirmationToken,
    );
  }

  @Patch('users/:id/resend-confirmation-link')
  resendConfirmationLink(@Param('id') userId: string) {
    return this.usersService.resendConfirmationLink(userId);
  }

  @Post('users/request-password-reset')
  requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.usersService.requestPasswordReset(
      requestPasswordResetDto.email,
    );
  }

  @Post('users/:id/reset-password')
  resetPassword(
    @Param('id') userId: string,
    @Body() passwordResetDto: PasswordResetDto,
  ) {
    return this.usersService.resetPassword({
      userId,
      passwordResetToken: passwordResetDto.passwordResetToken,
      newPassword: passwordResetDto.newPassword,
    });
  }
}
