import { Injectable } from '@angular/core';

/**
 * LoggerService provides a centralized way of logging
 * messages, warnings, and errors throughout the app.
 * This makes debugging and production logging easier.
 */
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`); 
  }

  warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }

  error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error);
  }
}
