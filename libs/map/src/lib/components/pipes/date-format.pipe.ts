import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

/**
 * DateFormatPipe transforms a Date or ISO string into a human-readable format.
 * Example usage: {{ someDate | dateFormat:'medium' }}
 */
@Pipe({
  name: 'dateFormatPipeTs',
  standalone: true
})
// DateFormatPipe transforms a Date or ISO string into a human-readable format.
export class DateFormatPipe implements PipeTransform {
    // Transform the input date to specified format
    transform(value: string | Date, format: string = 'medium'): string {
    if (!value) return '';
    // Use Angular's formatDate function for formatting
    return formatDate(value, format, 'en-US');
  }
}

