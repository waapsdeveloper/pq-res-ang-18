import { Injectable } from '@angular/core';
import { LoadingService } from './basic/loading.service';
import { AlertsService } from './basic/alerts.service';

interface ProductVariationOption {
  name: string;
  description?: string;
  price: number;
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
  variation?: string;
  parsedVariations?: ProductVariation[];
}

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(
    public loading: LoadingService,
    public alerts: AlertsService
  ) {}

  showLoader(msg = '') {
    return this.loading.showLoader(msg);
  }

  hideLoader() {
    return this.loading.hideLoader();
  }

  showAlert(msg: any, title = 'Alert') {
    return this.alerts.showAlert(msg, title);
  }

  presentToast(msg: any) {
    return this.alerts.presentToast(msg);
  }

  presentSuccessToast(msg: any) {
    return this.alerts.presentSuccessToast(msg);
  }

  presentFailureToast(msg: string) {
    return this.alerts.presentFailureToast(msg);
  }

  presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = '',
    okClass = '',
    cancelClass = ''
  ): Promise<boolean> {
    return this.alerts.presentConfirm(
      (okText = okText),
      (cancelText = cancelText),
      (title = title),
      (message = message),
      (okClass = okClass),
      (cancelClass = cancelClass)
    );
  }
  showImagePopup(title: string, imageUrl: string): Promise<void> {
    return this.alerts.showImagePopup(title, imageUrl);
  }

  showCustomDropdown(
    title: string,
    dropdownId: string,
    options: { value: any; label: string }[],
    selectedValue: any,
    confirmButtonText: string,
    updateValue: (newValue: any) => void
  ): Promise<any> {
    return this.alerts.showCustomDropdown(title, dropdownId, options, selectedValue, confirmButtonText, updateValue);
  }
  showProductSelectionTable(
    title: string,
    currencySymbol: string,
    products: Product[],
    confirmButtonText: string,
    onSelect: (productId: string) => void
  ): Promise<void> {
    // Parse variations before sending to alerts service
    const productsWithParsedVariations = products.map((product) => {
      if (product.parsedVariations) {
        // Already parsed, return as is
        return product;
      }
      let parsedVariations: ProductVariation[] = [];
      if (product.variation) {
        try {
          const parsed = JSON.parse(product.variation);
          // Ensure it's an array and has expected structure
          if (Array.isArray(parsed)) {
            parsedVariations = parsed;
          }
        } catch (e) {
          // Optionally log error or handle as needed
          parsedVariations = [];
        }
      }
      return {
        ...product,
        parsedVariations
      };
    });

    return this.alerts.showProductSelectionTable(title, currencySymbol, productsWithParsedVariations, confirmButtonText, onSelect);
  }

  showWarningMessage(message: string): Promise<void> {
    return this.alerts.showWarningMessage(message);
  }

  formatVariationOptions(variation: ProductVariation): string {
    return variation.options.map((option) => `...`).join('');
  }
}
