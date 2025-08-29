import { StringsService } from './strings.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

// Add these interfaces
interface ProductVariationOption {
  name: string;
  description?: string;
  price: number;
  selected?: boolean;
}

interface ProductVariation {
  type: string;
  selected: boolean;
  options: ProductVariationOption[];
}

interface Product {
  product_id: string;
  product_name: string;
  product_price: string;
  product_image: string;
  quantity?: string;
  price?: string;
  variation?: string;
  parsedVariations?: ProductVariation[];
  meta_key?: string;
  meta_value?: string;
  meta_key_type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(public strings: StringsService) { }

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
  async presentTripleConfirm(
    printText = 'Print',
    manualText = 'Manual Print',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = '',
    printClass = '',
    manualClass = '',
    cancelClass = ''
  ): Promise<'print' | 'manual' | 'cancel'> {
    return new Promise(async (resolve) => {
      const result = await Swal.fire({
        title: title,
        html: message,
        icon: 'question',
        showCancelButton: true, // needed for cancel button
        showDenyButton: true,   // adds the 2nd extra button
        confirmButtonText: printText,
        denyButtonText: manualText,
        cancelButtonText: cancelText,
        customClass: {
          confirmButton: printClass,
          denyButton: manualClass,
          cancelButton: cancelClass
        }
      });

      if (result.isConfirmed) {
        resolve('print');   // User clicked Print
      } else if (result.isDenied) {
        resolve('manual');  // User clicked Manual Print
      } else {
        resolve('cancel');  // User clicked Cancel or closed
      }
    });
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
    currencySymbol: string,
    products: Product[],
    confirmButtonText: string,
    onSelect: (productId: string) => void
  ): Promise<void> {
    const renderVariations = (variations: ProductVariation[]) => {
      // Defensive: variations should be an array of objects with options array
      if (
        !Array.isArray(variations) ||
        !variations.length ||
        (variations.length === 1 && Array.isArray(variations[0]) && variations[0].length === 0)
      ) {
        return 'No variations available';
      }
      return variations
        .filter((v) => v && typeof v === 'object' && Array.isArray(v.options))
        .map((variation) => {
          return variation.options && Array.isArray(variation.options)
            ? variation.options
              .map(
                (option) => `
                  <div style="
                    padding: 8px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;
                  ">
                    <span>${option.name}</span>
                    <span style="color: #2d397c; font-weight: 500;">${currencySymbol}${option.price !== undefined ? Number(option.price).toFixed(2) : '0.00'}</span>
                  </div>
                `
              )
              .join('')
            : '';
        })
        .join('');
    };

    const htmlTable = `
      <div style="max-height: 400px; overflow-y: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; table-layout: fixed;">
          <thead>
            <tr style="text-align: left; border-bottom: 1px solid #ccc; background: #f8f9fa;">
              <th style="padding: 12px 8px; width: 50px;">Image</th>
              <th style="padding: 12px 8px; width: 35%;">Name</th>
              <th style="padding: 12px 8px; width: 80px;">Price</th>
              <th style="padding: 12px 8px; width: 60px;">Add-ons</th>
            </tr>
          </thead>
          <tbody>
            ${products
        .map(
          (p, index) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px; vertical-align: middle;">
                  <img src="${p.product_image}" alt="${p.product_name}" 
                       style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;" />
                </td>
                <td style="padding: 8px; vertical-align: middle;">
                  <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500;">
                    ${p.product_name}
                  </div>
                </td>
                <td style="padding: 8px; vertical-align: middle;">
                  <div style="white-space: nowrap; color: #2d397c; font-weight: 500;">
                 ${currencySymbol}   ${p.product_price}
                  </div>
                </td>
                <td style="padding: 8px; text-align: center; vertical-align: middle; position: relative;">
                  ${p.parsedVariations?.length
              ? `
                    <button class="variation-btn" 
                      data-index="${index}"
                      style="background: none; border: none; cursor: pointer; padding: 4px;">
                      <i class="ti ti-versions" style="color: #2d397c; font-size: 18px;"></i>
                    </button>
                    <div class="variation-popover" id="popover-${index}" 
                         style="display: none; position: absolute; background: white; 
                                padding: 12px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); 
                                z-index: 1000; width: 220px; right: 0; margin-top: 4px;
                                border: 1px solid #eee;">
                      <div style="font-weight: 500; color: #2d397c; margin-bottom: 8px; 
                                 padding-bottom: 8px; border-bottom: 1px solid #eee;">
                        Add-ons
                      </div>
                      <div style="max-height: 200px; overflow-y: auto;">
                        ${renderVariations(p.parsedVariations)}
                      </div>
                    </div>
                  `
              : '<span style="color: #999;">-</span>'
            }
                </td>
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
      width: '700px',
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        container: 'product-selection-modal',
        popup: 'product-selection-popup'
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (!popup) return;

        let activePopover: HTMLElement | null = null;

        // Close all popovers
        const closeAllPopovers = () => {
          popup.querySelectorAll('.variation-popover').forEach((popover: HTMLElement) => {
            popover.style.display = 'none';
          });
          activePopover = null;
        };

        // Handle variation button clicks
        popup.querySelectorAll('.variation-btn').forEach((btn: HTMLElement) => {
          btn.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            const index = btn.getAttribute('data-index');
            const popover = popup.querySelector(`#popover-${index}`) as HTMLElement;

            if (activePopover === popover) {
              // If clicking the same button, close the popover
              closeAllPopovers();
            } else {
              // Close other popovers and open this one
              closeAllPopovers();
              if (popover) {
                popover.style.display = 'block';
                activePopover = popover;
              }
            }
          });
        });

        // Close popover when clicking outside
        document.addEventListener('click', (e: Event) => {
          if (!popup.contains(e.target as Node)) {
            closeAllPopovers();
          }
        });

        // Close popover when clicking on modal but outside the table
        popup.addEventListener('click', (e: Event) => {
          if (!(e.target as HTMLElement).closest('table')) {
            closeAllPopovers();
          }
        });
      },
      willClose: () => {
        // Clean up event listeners
        document.removeEventListener('click', () => { });
      }
    });
  }

  async showWarningMessage(message: string): Promise<void> {
    await Swal.fire({
      icon: 'warning',
      text: message,
      showConfirmButton: false,
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      customClass: {
        popup: 'swal2-border-radius'
      }
    });
  }
  async showImagePopup(title: string, imageUrl: string): Promise<void> {
    await Swal.fire({
      title: `<div style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">${title}</div>`,
      html: `
        <div style="display: flex; justify-content: center; align-items: center;">
          <img 
            src="${imageUrl}" 
            alt="Image" 
            style="width: 350px; height: 350px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 16px rgba(0,0,0,0.08);" 
          />
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-image-popup'
      },
      background: '#fff',
      width: '400px',
      padding: '1.5rem'
    });
  }
}
