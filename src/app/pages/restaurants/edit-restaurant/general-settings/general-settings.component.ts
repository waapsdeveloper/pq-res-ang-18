import { Component, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss'
})
export class GeneralSettingsComponent {
  @Input() form: any;
  @Input() generalFields: any;
  @Input() model: any;
  @Input() restaurantId: any;

  constructor(
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  async submitGeneral() {
    // Validate general fields
    const generalFields = ['name', 'address', 'phone', 'email', 'copyright_text', 'website'];
    const missingFields = [];
    for (const field of generalFields) {
      const value = this.model[field];
      if (!value || value.trim() === '') {
        missingFields.push(field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
      }
    }
    if (missingFields.length > 0) {
      this.utility.presentFailureToast(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.model.email)) {
      this.utility.presentFailureToast('Please enter a valid email address');
      return;
    }
    // Validate website format
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (this.model.website && !websiteRegex.test(this.model.website)) {
      this.utility.presentFailureToast('Please enter a valid website URL');
      return;
    }
    // Submit general info via new API call
    try {
      const res = await this.network.updateGeneralSettings(this.model, this.restaurantId);
      if (res) {
        this.utility.presentSuccessToast('General info updated!');
      } else {
        this.utility.presentFailureToast('Failed to update general info.');
      }
    } catch (error) {
      this.utility.presentFailureToast('An error occurred while updating general info.');
    }
  }
}
