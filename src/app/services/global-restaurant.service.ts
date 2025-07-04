import { Injectable } from '@angular/core';
import { NgSimpleStateBaseRxjsStore } from 'ng-simple-state';
import { NgSimpleStateStoreConfig } from 'ng-simple-state/public-api';
import { Observable } from 'rxjs';
import { NetworkService } from './network.service';


export interface GlobalRestaurantState {
  id: number;
  name: string;
  image: string;

}
@Injectable({
  providedIn: 'root'
})
export class GlobalRestaurantService extends NgSimpleStateBaseRxjsStore<GlobalRestaurantState>  {

  restaurant;

  constructor() {
    super();
  }

  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalRestaurantState'
    };
  }

  protected initialState(): GlobalRestaurantState {
    return {
      id: 1,
      name: "The Local CraftFood",
      image: 'assets/svg/logo.svg'
    };
  }

  setRestaurant(id: number, name: string) {
    this.restaurant = { id, name };
    this.setState(state => ({ id: id, name: name }));
    console.log('Service ',this.restaurant);
    localStorage.setItem("restaurant_id", this.restaurant.id);




  }


  getRestaurant(): Observable<any>{
    return this.selectState( state => state );
  }

  getRestaurantId(): Observable<number>{
    return this.selectState( state => state.id );
  }

  getRestaurantName(): Observable<string> {
    return this.selectState( state => state.name );
  }

  getRestaurantNamePromise(): Promise<string> {

    return new Promise((resolve) => {
      this.getRestaurantName().subscribe(name => {
        resolve(name);
      });
    });
  }


}
