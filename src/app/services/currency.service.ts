import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NetworkService } from './network.service';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface CurrencyData {
  restaurant_id: number;
  currency: string;
  currency_symbol: string;
}
@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends NgSimpleStateBaseRxjsStore<CurrencyData> {
  private restaurantId: string | null = null;
  private currency: string | null = null;
  private currencySymbol: string | null = null;
  tax_value: number = 0;
  currency_symbol: string = '$';

  constructor(private network: NetworkService) {
    super();
    // Initialize from local storage on service creation
    this.getTaxFromLocalStorage();
  }

  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'CurrencyData'
    };
  }
  protected initialState(): CurrencyData {
    return {
      restaurant_id: 0,
      currency: 'USD',
      currency_symbol: '$'
    };
  }

  setRestaurantId(id: number): void {
    this.restaurantId = id.toString();
    this.setState((state) => ({ restaurant_id: id }));
  }

  getRestaurantId(): Observable<any> {
    return this.selectState((state) => state.restaurant_id);
  }

  setCurrency(currency: string): void {
    this.currency = currency;
    this.setState((state) => ({ currency }));
  }

  getCurrency(): Observable<any> {
    return this.selectState((state) => state.currency);
  }

  setCurrencySymbol(symbol: string): void {
    this.currencySymbol = symbol;
    this.setState((state) => ({ currency_symbol: symbol }));
  }

  getCurrencySymbol(): Observable<any> {
    return this.selectState((state) => state.currency_symbol);
  }

  setTax(tax: number): void {
    console.log('Setting tax:', tax);
    ('');
    this.tax_value = tax;
    localStorage.setItem('restaurant_tax', tax?.toString());
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
