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
      subject: this.configService.get('MAIL_REGISTRATION_SUBJECT', {
        infer: true,
      }),
      template: 'registration.hbs',
      context: {
        confirmationLink,
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
