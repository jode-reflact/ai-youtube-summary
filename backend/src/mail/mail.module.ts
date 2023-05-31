import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailService } from './mail.service';
import { EnvironmentVariables } from '../config/environment-variables';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        transport: {
          host: configService.get('MAIL_HOST', { infer: true }),
          port: configService.get('MAIL_PORT', { infer: true }),
          secure: true,
          auth: {
            user: configService.get('MAIL_USER', { infer: true }),
            pass: configService.get('MAIL_PASSWORD', { infer: true }),
          },
        },
        defaults: {
          from: configService.get('MAIL_FROM', { infer: true }),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
