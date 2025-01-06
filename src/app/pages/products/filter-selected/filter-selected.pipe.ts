import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSelected'
})
export class FilterSelectedPipe implements PipeTransform {
  transform(variations: any[], key: string, value: any): any[] {
    if (!variations || !key || value === undefined) return variations;
    return variations.filter(variation => variation[key] === value);
  }
}
