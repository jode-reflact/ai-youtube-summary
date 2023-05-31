import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

import { EnvironmentVariables } from '../config/environment-variables';

@Injectable()
export class MailService {
  private readonly EMAILS_ENABLED = this.configService.get('EMAILS_ENABLED', {
    infer: true,
  });

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async sendRegistrationMail({
    email,
    confirmationLink,
  }: {
    email: string;
    confirmationLink: string;
  }): Promise<void> {
    await this.sendMail({
      to: email,
      subject: this.configService.get('MAIL_SUBJECT_REGISTRATION', {
        infer: true,
      }),
      template: 'registration.hbs',
      context: {
        confirmationLink,
      },
    });
  }

  async sendPasswordResetMail({
    email,
    changePasswordToken,
  }: {
    email: string;
    changePasswordToken: string;
  }) {
    await this.sendMail({
      to: email,
      subject: this.configService.get('MAIL_SUBJECT_PASSWORD_RESET', {
        infer: true,
      }),
      template: 'password-reset.hbs',
      context: {
        changePasswordToken,
      },
    });
  }

  private async sendMail(sendMailOptions: ISendMailOptions) {
    if (!this.EMAILS_ENABLED) {
      return;
    }

    return this.mailerService.sendMail(sendMailOptions);
  }
}
