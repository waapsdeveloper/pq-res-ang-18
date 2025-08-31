import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { Observable } from 'rxjs';
import { InvoiceService } from './invoice.service';

export interface GlobalDataState {
  restaurant_id: number;
  currency: string;
  digits: number;
  currency_symbol: string;
  tax_percentage: number;
  restaurant_name?: string; // Optional field for restaurant name
  delivery_charges?: number; //
  tips?: number; //
}
@Injectable({
  providedIn: 'root'
})
export class GlobalDataService extends NgSimpleStateBaseRxjsStore<GlobalDataState> {
  private restaurantId: string | null = null;
  private currency: string | null = null;
  private currencySymbol: string | null = null;

  constructor(private network: NetworkService, private invoiceService: InvoiceService) {
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
      digits: 2,
      currency_symbol: '$',
      tax_percentage: 0,
      restaurant_name: '' // Initialize with an empty string or a default value
    };
  }

  setRestaurantId(id: number): void {
    this.restaurantId = id.toString();
    this.setState((state) => ({ restaurant_id: id }));
  }

  getRestaurantId(): Observable<any> {
    return this.selectState((state) => state.restaurant_id);
  }

  setRestaurantName(name: string): void {
    this.setState((state) => ({ restaurant_name: name }));
  }

  getRestaurantName(): Observable<any> {
    return this.selectState((state) => state.restaurant_name);
  }
  getDigits(): Observable<any> {
    return this.selectState((state) => state.digits);
  }
  setDigits(digits: number): void {
    this.setState((state) => ({ digits }));
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
  getDeliveryCharges(): Observable<any> {
    return this.selectState((state) => state.delivery_charges);
  }
  setDeliveryCharges(deliveryCharges: number): void {
    this.setState((state) => ({ delivery_charges: deliveryCharges }));
  }
  getTips(): Observable<any> {
    return this.selectState((state) => state.tips);
  }
  setTips(tips: number): void {
    this.setState((state) => ({ tips }));
  }

  getStateRestaurantPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.selectState((state) => state).subscribe({
        next: (id) => {
          if (id) {
            resolve(id);
          } else {
            reject('No restaurant ID found in state');
          }
          subscription.unsubscribe(); // Cleanup to avoid memory leaks
        },
        error: (error) => {
          reject(error);
          subscription.unsubscribe(); // Cleanup on error
        }
      });
    });
  }

  getDefaultRestaurant() {
    return new Promise(async (resolve, reject) => {
      const defaults = await this.network.getDefaultRestaurantId();

      console.log('defualts', defaults);

      if (defaults && defaults.active_restaurant) {
        let R = defaults.active_restaurant;
        this.invoiceService.fetchInvoiceDataObservable(R.id)
        localStorage.setItem('restaurant', JSON.stringify(R));
        localStorage.setItem('restaurant_id', R.id);
        this.setRestaurantId(R.id);
        this.setRestaurantName(R.name);
        if(defaults.restaurant_meta && defaults.restaurant_meta.restaurant_attributes){
          this.setDigits(parseInt(defaults.restaurant_meta.restaurant_attributes.digits) || 2);
        }

        const config = await this.network.getRestaurantConfigById(R.id);
        console.log('branch_config', config);

        if (config?.data) {
          localStorage.setItem('restaurant_config', JSON.stringify(config.data));
          this.setCurrency(config.data.currency);
          this.setCurrencySymbol(config.data.currency_symbol);
          this.setTaxPercentage(config.data.tax);
          this.setDeliveryCharges(config.data.delivery_charges);
          this.setTips(config.data.tips);
        }

        resolve(R);
      } else {
        reject('No default restaurant found');
      }
    });
  }
}
