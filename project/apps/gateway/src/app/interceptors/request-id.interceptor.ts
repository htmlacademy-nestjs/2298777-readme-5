import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { randomUUID } from 'node:crypto';

export class RequestIdInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {
    const requestId = randomUUID();
    const request = context.switchToHttp().getResponse<Request>();
    request.headers.set('x-request-id', requestId);

    Logger.log(`${request.method}: ${request.url} - ${requestId}`, 'Request');
    return next.handle();
  }
}
