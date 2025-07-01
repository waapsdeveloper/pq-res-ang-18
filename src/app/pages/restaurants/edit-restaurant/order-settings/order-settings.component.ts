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
    const orderFields = ['currency', 'dial_code', 'tax'];
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
    // Validate tax percentage
    const tax = parseFloat(this.model.tax);
    if (isNaN(tax) || tax < 0 || tax > 100) {
      this.utility.presentFailureToast('Tax percentage must be between 0 and 100');
      return;
    }
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
