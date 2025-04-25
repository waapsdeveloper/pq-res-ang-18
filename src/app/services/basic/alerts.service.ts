import { StringsService } from './strings.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(public strings: StringsService) {}

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
          cancelButton: cancelClass
        }
      });

      if (result.isConfirmed) {
        resolve(true); // User clicked OK
      } else {
        resolve(false); // User clicked Cancel or closed the modal
      }
    });
  }

  presentRadioSelections(title: any, message: any, inputs: any, okText = 'OK', cancelText = 'Cancel'): Promise<any> {
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
  async showCustomDropdown<T>(
    title: string,
    dropdownId: string,
    options: { value: T; label: string }[],
    selectedValue: T,
    confirmButtonText: string,
    updateValue: (newValue: T) => void
  ): Promise<T | null> {
    const { value: newValue, isConfirmed } = await Swal.fire<string>({
      title,
      icon: 'info', // ← pick 'info', 'warning', 'success', etc.
      html: `
        <div style="
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        ">
          <select id="${dropdownId}" style="
            flex: 1;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
          ">
            ${options
              .map((opt) => `<option value="${opt.value}" ${opt.value === selectedValue ? 'selected' : ''}>${opt.label}</option>`)
              .join('')}
          </select>
          <button id="swal-confirm-btn" class="swal2-confirm swal2-styled" style="
            margin: 0;
            padding: 0.5rem 1rem;
            font-size: 1rem;
          ">
            ${confirmButtonText}
          </button>
        </div>
      `,
      showCancelButton: false,
      showConfirmButton: false, // we’re using our own confirm button inside HTML
      didOpen: () => {
        const dropdown = Swal.getPopup()!.querySelector<HTMLSelectElement>(`#${dropdownId}`);
        const confirmBtn = Swal.getPopup()!.querySelector<HTMLButtonElement>('#swal-confirm-btn')!;

        // When our inline button is clicked, trigger SweetAlert’s resolve
        confirmBtn.addEventListener('click', () => {
          Swal.clickConfirm();
        });

        // Optional: focus the dropdown on open
        dropdown?.focus();
      },
      preConfirm: () => {
        const dropdown = Swal.getPopup()!.querySelector<HTMLSelectElement>(`#${dropdownId}`);
        return dropdown?.value ?? null;
      }
    });

    if (isConfirmed && newValue !== null) {
      updateValue(newValue as unknown as T);
      this.presentSuccessToast('Updated! 🎉');
      return newValue as unknown as T;
    }

    return null;
  }

  async showProductSelectionTable(
    title: string,
    products: {
      product_id: string;
      product_name: string;
      product_price: string;
      product_image: string;
    }[],
    confirmButtonText: string,
    onSelect: (productId: string) => void
  ): Promise<void> {
    const htmlTable = `
      <div style="max-height: 400px; overflow-y: auto;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="text-align: left; border-bottom: 1px solid #ccc;">
              <th style="padding: 0.5rem;">Image</th>
              <th style="padding: 0.5rem;">Name</th>
              <th style="padding: 0.5rem;">Price</th>
              
            </tr>
          </thead>
          <tbody>
            ${products
              .map(
                (p) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 0.5rem;">
                  <img src="${p.product_image}" alt="${p.product_name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;" />
                </td>
                <td style="padding: 0.5rem;">${p.product_name}</td>
                <td style="padding: 0.5rem;">$${p.product_price}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    await Swal.fire({
      title,
      html: htmlTable,
      showConfirmButton: false,
      showCancelButton: true,
      didOpen: () => {
        const buttons = Swal.getPopup()!.querySelectorAll<HTMLButtonElement>('.select-product-btn');
        buttons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const productId = btn.dataset['id']!;
            Swal.close();
            onSelect(productId);
          });
        });
      }
    });
  }
}
