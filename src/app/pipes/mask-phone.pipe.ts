// src/app/pipes/mask-phone.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maskPhone', pure: true })
export class MaskPhonePipe implements PipeTransform {
  transform(
    value: string | number | { phone: string | number } | null | undefined,
    visibleDigits = 3,
    maskChar = '*'
  ): string {
    if (value === null || value === undefined) return '';

    // Extract phone as string
    let phoneStr: string;
    if (typeof value === 'object' && 'phone' in value) {
      phoneStr = String(value.phone ?? '');
    } else {
      phoneStr = String(value);
    }

    // Remove non-digit characters
    phoneStr = phoneStr.replace(/\D/g, '');
    if (!phoneStr) return '';

    // Mask all but last `visibleDigits`
    const chars = phoneStr.split('');
    let digitCount = 0;

    for (let i = chars.length - 1; i >= 0; i--) {
      if (/\d/.test(chars[i])) {
        digitCount++;
        if (digitCount > visibleDigits) {
          chars[i] = maskChar;
        }
      }
    }

    return chars.join('');
  }
}
