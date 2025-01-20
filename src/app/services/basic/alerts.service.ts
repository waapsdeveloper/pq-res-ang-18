import { StringsService } from './strings.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    public strings: StringsService
  ) {}

  showAlert(msg: any, title = 'Alert'): Promise<any> {
    return new Promise(async (resolve) => {
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     header: title,
    //     message: msg,
    //     buttons: [
    //       {
    //         text: 'OK',
    //         cssClass: 'secondary',
    //         handler: (blah) => {
    //           resolve(true);
    //         },
    //       },
    //     ],
    //   });

    //   await alert.present();
    });

  }

  async presentSuccessToast(msg: string) {
    console.log(msg);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 3000, // Toast will close after 3 seconds
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  async presentFailureToast(msg: any) {
    console.log(msg);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 3000, // Toast will close after 3 seconds
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  async presentToast(msg: any) {
    // const toast = await this.toastCtrl.create({
    //   message: msg,
    //   duration: 5000,
    //   position: 'bottom',
    // });
    // toast.present();
  }

  async presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = '',
    okClass = '',
    cancelClass = ''
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const result = await Swal.fire({
        title: title,
        html: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: okText,
        cancelButtonText: cancelText,
        customClass: {
          confirmButton: okClass,
          cancelButton: cancelClass,
        },
      });

      if (result.isConfirmed) {
        resolve(true); // User clicked OK
      } else {
        resolve(false); // User clicked Cancel or closed the modal
      }
    });
  }

  presentRadioSelections(
    title: any,
    message: any,
    inputs: any,
    okText = 'OK',
    cancelText = 'Cancel'
  ): Promise<any> {
    return new Promise(async (resolve) => {
      // const alert = await this.alertController.create({
      //   header: title,
      //   message,
      //   inputs,
      //   buttons: [
      //     {
      //       text: cancelText,
      //       role: 'cancel',
      //       handler: () => {
      //         resolve(false);
      //       },
      //     },
      //     {
      //       text: okText,
      //       handler: (data) => {
      //         resolve(data);
      //       },
      //     },
      //   ],
      // });
      // alert.present();
    });
  }
}
