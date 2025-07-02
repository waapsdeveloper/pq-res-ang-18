import { Component, Input } from '@angular/core';
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
      if (isNaN(tax) || tax < 0 || tax > 100) {
        this.utility.presentFailureToast('Tax percentage must be between 0 and 100');
        return;
      }
    }
    // Validate tips percentage if enabled
    if (this.model.enableTips) {
      const tips = parseFloat(this.model.tips);
      if (isNaN(tips) || tips < 0 || tips > 100) {
        this.utility.presentFailureToast('Tips percentage must be between 0 and 100');
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
    // Build meta array for enabled fields
    const meta = [];
    if (this.model.enableTax) meta.push({ key: 'tax', value: this.model.tax });
    if (this.model.enableTips) meta.push({ key: 'tips', value: this.model.tips });
    if (this.model.enableDeliveryCharges) meta.push({ key: 'delivery_charges', value: this.model.delivery_charges });
    // Add meta to model for API
    this.model.meta = meta;
    // Submit order/branch config data via new API call
    try {
      const res = await this.network.updateOrderSettings(this.model, this.restaurantId);
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
