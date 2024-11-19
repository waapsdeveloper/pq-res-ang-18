import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {



  constructor() { }

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
