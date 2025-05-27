import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface GlobalDataState {
  restaurant_id: number;
  currency: string;
  currency_symbol: string;
  tax_percentage: number;
}
@Injectable({
  providedIn: 'root'
})
export class GlobalDataService extends NgSimpleStateBaseRxjsStore<GlobalDataState> {
  private restaurantId: string | null = null;
  private currency: string | null = null;
  private currencySymbol: string | null = null;

  constructor(private network: NetworkService) {
    super();
  }
  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalDataState'
    };
  }
  protected initialState(): GlobalDataState {
    return {
      restaurant_id: 0,
      currency: 'USD',
      currency_symbol: '$',
      tax_percentage: 0
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
  setTaxPercentage(tax: number): void {
    this.setState((state) => ({ tax_percentage: tax }));
  }
  getTaxPercentage(): Observable<any> {
    return this.selectState((state) => state.tax_percentage);
  }

  getDefaultRestaurant() {
    return new Promise(async (resolve, reject) => {
      const defaults = await this.network.getDefaultRestaurantId();

      console.log('defualts', defaults);

      if (defaults && defaults.active_restaurant) {
        let R = defaults.active_restaurant;

        localStorage.setItem('restaurant', JSON.stringify(R));
        localStorage.setItem('restaurant_id', R.id);
        this.setRestaurantId(R.id);

        const config = await this.network.getRestaurantConfigById(R.id);
        console.log('branch_config', config);

        if (config?.data) {
          localStorage.setItem('restaurant_config', JSON.stringify(config.data));
          this.setCurrency(config.data.currency);
          this.setCurrencySymbol(config.data.currency_symbol);
          this.setTaxPercentage(config.data.tax);
        }

        resolve(R);
      } else {
        reject('No default restaurant found');
      }
    });
  }
}
