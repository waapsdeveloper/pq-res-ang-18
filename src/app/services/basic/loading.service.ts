import { Injectable } from '@angular/core';
import { NgSimpleStateBaseRxjsStore } from 'ng-simple-state';
import { NgSimpleStateStoreConfig } from 'ng-simple-state/public-api';
import { Observable } from 'rxjs';

export interface GlobalLoaderState {
  loader: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class LoadingService extends NgSimpleStateBaseRxjsStore<GlobalLoaderState> {
  loader;

  constructor() {
    super();
  }
  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalLoaderState'
    };
  }
  protected initialState(): GlobalLoaderState {
    return {
      loader: false
    };
  }
  setLoader(flag: boolean) {
    this.loader = { flag };
    this.setState((state) => ({ loader: flag }));
  }

  getLoader(): Observable<any> {
    return this.selectState((state) => state);
  }

  async showLoader(message = '') {
    // this.loading = await this.loadingController.create({
    //   cssClass: 'my-loader-class',
    //   spinner: "circles", // Round spinner
    //   translucent: false,
    //   backdropDismiss: false
    // });
    // await this.loading.present();
    this.setLoader(true)
  }

  async hideLoader() {
    // if (this.loading) {
    //   this.loading.dismiss();
    // }
    this.setLoader(false);
  }
}
