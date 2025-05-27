import { Injectable, Inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NetworkService } from '../services/network.service';
import { GlobalDataService } from '../services/global-data.service';

@Injectable({
  providedIn: 'root'
})
export class DsDataResolver implements Resolve<any> {
  constructor(
    private network: NetworkService,
    @Inject(GlobalDataService) private globalData: GlobalDataService
  ) {}

  async resolve(): Promise<Observable<any>> {
    // If no restaurant_id, or data needs refresh, fetch and store it
    const res = await this.globalData.getDefaultRestaurant();

    return of({
      restaurant_id: localStorage.getItem('restaurant_id'),
      res,
    });
  }


}
