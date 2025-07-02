import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-order-settings',
  templateUrl: './order-settings.component.html',
  styleUrl: './order-settings.component.scss'
})
export class OrderSettingsComponent {
  @Input() form: any;
  @Input() orderFields: any;
  @Input() model: any;
  @Input() restaurantId: any;

  constructor(
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  async submitOrder() {
    // Validate order fields
    const orderFields = ['currency', 'dial_code'];
    const missingFields = [];
    for (const field of orderFields) {
      const value = this.model[field];
      if (!value || value.toString().trim() === '') {
        missingFields.push(field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
      }
    }
    if (missingFields.length > 0) {
      this.utility.presentFailureToast(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }
    // Validate tax percentage if enabled
    if (this.model.enableTax) {
      const tax = parseFloat(this.model.tax);
      if (isNaN(tax) || tax < 0 || tax > 50) {
        this.utility.presentFailureToast('Tax percentage must be between 0 and 50');
        return;
      }
    }
    // Validate delivery charges if enabled
    if (this.model.enableDeliveryCharges) {
      const delivery = parseFloat(this.model.delivery_charges);
      if (isNaN(delivery) || delivery < 0) {
        this.utility.presentFailureToast('Delivery charges must be 0 or greater');
        return;
      }
    }

    // Create filtered payload with only required fields
    const payload = {
      name: this.model.name,
      country: this.model.country,
      branch_id: this.restaurantId,
      tax: this.model.tax,
      currency: this.model.currency,
      enableDeliveryCharges: this.model.enableDeliveryCharges,
      enableTax: this.model.enableTax,
      dial_code: this.model.dial_code,
      delivery_charges: this.model.delivery_charges
    };
    console.log(payload, 'payload');

    // Submit order/branch config data via new API call
    try {
      const res = await this.network.updateBranchConfig(payload, this.restaurantId);
      if (res) {
        this.utility.presentSuccessToast('Order/branch config updated!');
      } else {
        this.utility.presentFailureToast('Failed to update order/branch config.');
      }
    } catch (error) {
      this.utility.presentFailureToast('An error occurred while updating order/branch config.');
    }
  }
}
