import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { environmentVariablesValidationSchema } from './config/environment-variables-validation-schema';
import { EnvironmentVariables } from './config/environment-variables';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BusinessErrorFilter } from './common/filters/business-error-filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform-interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentVariablesValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        uri: configService.get<string>('MONGODB_CONNECTION_STRING', {
          infer: true,
        }),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BusinessErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
