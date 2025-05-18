import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency_symbol = '$';
  tax_value: number = 0;

  constructor() {
    // Initialize from local storage on service creation
    this.getCurrencyFromLocalStorage();
    this.getTaxFromLocalStorage();
  }

  setCurrency(currency: string): void {
    this.currency_symbol = currency;
    localStorage.setItem('restaurant_currency', currency);
  }

  getCurrencyFromLocalStorage(): string {
    const currency = localStorage.getItem('restaurant_currency');
    if (currency) {
      this.currency_symbol = currency;
    } else {
      this.currency_symbol = '$'; // Default value
    }
    return this.currency_symbol;
  }

  setTax(tax: number): void {
    console.log('Setting tax:', tax);
    ('');
    this.tax_value = tax;
    localStorage.setItem('restaurant_tax', tax.toString());
  }

  getTaxFromLocalStorage(): number {
    const tax = localStorage.getItem('restaurant_tax');
    console.log('Getting tax from local storage', this.tax_value);
    if (tax) {
      this.tax_value = Number(tax);
    } else {
      this.tax_value = 0; // Default value
    }
    return this.tax_value;
  }
}
