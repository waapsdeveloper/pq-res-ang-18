import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency_symbol = '$';

  constructor() {
    // Initialize from local storage on service creation
    this.getCurrencyFromLocalStorage();
  }

  private getCurrencyFromLocalStorage(): string {
    const currency = localStorage.getItem('restaurant_currency');
    if (currency) {
      this.currency_symbol = currency;
    } else {
      this.currency_symbol = '$'; // Default value
    }
    return this.currency_symbol;
  }
}
