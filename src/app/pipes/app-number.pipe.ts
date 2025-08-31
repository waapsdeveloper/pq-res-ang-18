import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GlobalDataService } from '../services/global-data.service';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'appNumber',
  pure: true
})
export class AppNumberPipe implements PipeTransform {
 constructor(
    private decimalPipe: DecimalPipe,
    private config: GlobalDataService
  ) {}

  transform(value: any, locale: string = 'en-US'): Observable<string | null> {
    if (value === null || value === undefined || value === '') {
      return new Observable<string>(obs => obs.next(''));
    }

    // directly subscribe to digits from state
    return this.config.getDigits().pipe(
      map((digits: number) => {
        const format = `1.${digits}-${digits}`;
        return this.decimalPipe.transform(value, format, locale);
      })
    );
  }
}
