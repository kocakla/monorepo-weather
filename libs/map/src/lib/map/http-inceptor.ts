import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Global HTTP interceptor for handling outgoing requests and incoming responses.
 */
export const globalHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService); // Inject LoggerService

  logger.log(`Outgoing request: ${req.method} ${req.url}`); // Log outgoing request

  return next(req).pipe(
    tap((event) => { 
      logger.log(`Response received from: ${req.url}`); // Log successful response
    }),
    catchError((error) => {
      logger.error(`HTTP error occurred for: ${req.url}`, error); // Log error details
      return throwError(() => error);
    })
  );
};
