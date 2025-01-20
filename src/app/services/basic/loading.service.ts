import { Injectable } from '@angular/core';
import { NgSimpleStateBaseRxjsStore } from 'ng-simple-state';
import { NgSimpleStateStoreConfig } from 'ng-simple-state/public-api';
import { Observable } from 'rxjs';

export interface GlobalLoaderState {
 loader:boolean

}
@Injectable({
  providedIn: 'root'
})
export class LoadingService extends NgSimpleStateBaseRxjsStore<GlobalLoaderState>{



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
    loader:true
  };
  }
  async showLoader(message = '') {

    // this.loading = await this.loadingController.create({
    //   cssClass: 'my-loader-class',
    //   spinner: "circles", // Round spinner
    //   translucent: false,
    //   backdropDismiss: false
    // });

    // await this.loading.present();



  }

  async hideLoader() {

    // if (this.loading) {
    //   this.loading.dismiss();
    // }

  }

}
