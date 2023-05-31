import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { BusinessError } from '../errors/business.error';

@Catch(BusinessError)
class BusinessErrorFilter implements ExceptionFilter {
  catch(error: BusinessError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { descriptionCode, message } = error;

    response.status(200).json({
      error: {
        timestamp: new Date().toISOString(),
        message,
        path: request.url,
        descriptionCode,
      },
    });
  }
}

export { BusinessErrorFilter };
