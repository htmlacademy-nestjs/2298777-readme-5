import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.response?.statusText || 'Internal server error';

    response.status(status).json({ statusCode: status, message });
  }
}
