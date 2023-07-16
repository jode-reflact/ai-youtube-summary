import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { EnvironmentVariables } from './config/environment-variables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const logger = new Logger(bootstrap.name);
  const FRONTEND_HOST = config.get('FRONTEND_HOST');
  const BACKEND_PORT = config.get('BACKEND_PORT', { infer: true });
  app.enableCors({ origin: FRONTEND_HOST });
  await app.listen(BACKEND_PORT);
  logger.log(`🚀 Server is running on port ${BACKEND_PORT}`);
}
bootstrap();
