import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-phone-input',
  template: `
    <div [formGroup]="phoneFormGroup">
      <div class="form-group d-flex align-items-center">
        <label *ngIf="props['countryCodeLabel']" class="form-label me-2 mb-0">
          {{ props['countryCodeLabel'] }}
        </label>

        <select [formControl]="getFormControl('countryCode')" class="form-control me-2" style="max-width: 160px;">
          <option value="" disabled>Select</option>
          <option *ngFor="let country of countryCodes" [value]="country.value">{{ country.label }} - {{ country.value }}</option>
        </select>

        <input
          type="tel"
          [formControl]="getFormControl('number')"
          class="form-control"
          [placeholder]="props.placeholder || 'Phone number'"
          style="flex: 1 1 0;"
        />
      </div>

      <div *ngIf="showError" class="invalid-feedback d-block">
        {{ errorMessage }}
      </div>
    </div>
  `
})
export class PhoneInputComponent extends FieldType implements OnInit {
  constructor(private network: NetworkService) {
    super();
  }
  countryCodes = [];

  get phoneFormGroup(): FormGroup {
    return this.formControl as FormGroup;
  }

  async ngOnInit(): Promise<void> {
    const res = await this.network.getCurrencies();
    if (res && res['data']) {
      this.countryCodes = res['data'].map((c: any) => ({
        label: `${c.dial_code} - ${c.country}`,
        value: c.dial_code
      }));
      console.log(this.countryCodes);
    }
    const group = this.phoneFormGroup;

    if (!group.get('countryCode')) {
      group.addControl('countryCode', new FormControl(''));
    }
    if (!group.get('number')) {
      group.addControl('number', new FormControl(''));
    }
  }

  getFormControl(name: string): FormControl {
    const control = this.phoneFormGroup.get(name);
    if (!(control instanceof FormControl)) {
      throw new Error(`Control '${name}' is not a FormControl`);
    }
    return control;
  }

  get errorMessage(): string {
    const numberControl = this.phoneFormGroup.get('number');
    if (numberControl?.hasError('required')) {
      return 'Phone number is required';
    }
    return 'Invalid phone number';
  }
}
