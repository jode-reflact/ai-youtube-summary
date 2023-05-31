import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { EnvironmentVariables } from './config/environment-variables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  const BACKEND_PORT = config.get('BACKEND_PORT', { infer: true });
  await app.listen(BACKEND_PORT);
}
bootstrap();
