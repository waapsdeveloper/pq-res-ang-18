import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-branch-config',
  templateUrl: './add-branch-config.component.html',
  styleUrl: './add-branch-config.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddBranchConfigComponent {
  form: FormGroup = new FormGroup({});
  model: { branch_id: string; tax: string; currency: string; dial_code: string } = {
    branch_id: '',
    tax: '',
    currency: '',
    dial_code: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'branch_id',
          type: 'select',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Select restaurant',
            required: true,
            options: [] // Will be filled dynamically
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'currency',
          type: 'select',
          props: {
            label: 'Currency',
            placeholder: 'Select currency',
            required: true,
            options: [] // Will be filled dynamically
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'dial_code',
          type: 'input',
          props: {
            label: 'Dial Code',
            placeholder: 'Enter dial code (e.g. +1)'
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'tax',
          type: 'input',
          props: {
            label: 'Tax (%)',
            placeholder: 'Enter tax percentage',
            type: 'number',
            min: 0,
            max: 100
          },
          className: 'col-md-6 col-12'
        }
      ]
    }
  ];
  allCurrencies: any[];

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.setBranchesInForm();
    this.setCurrenciesInForm();
    this.form.valueChanges.subscribe((value) => {
      if (value.currency) {
        const selectedCurrency = this.allCurrencies.find((c) => c.value === value.currency);
        if (selectedCurrency) {
          this.form.get('dial_code').setValue(selectedCurrency.dial_code, { emitEvent: false });
        }
      }
    });
  }

  async getBranches(): Promise<any[]> {
    const obj = {
      search: '',
      perpage: 500
    };
    const res = await this.network.getRestaurants(obj);
    if (res && res['data']) {
      let d = res['data'];
      let dm = d['data'];
      return dm.map((r) => {
        return {
          value: r.id,
          label: r.name
        };
      }) as any[];
    }
    return [];
  }

  async setBranchesInForm() {
    const res = await this.getBranches();
    for (let i = 0; i < this.fields.length; i++) {
      for (let j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key === 'branch_id') {
          fl.props.options = res;
        }
        // Set a default value for dial_code if needed
      }
    }
  }

  async getCurrencies(): Promise<any[]> {
    const res = await this.network.getCurrencies();
    console.log(res);
    if (res && res['data']) {
      return res['data'].map((c) => ({
        value: c.currency_code,
        label: `${c.flag} ${c.currency_code} - ${c.currency_name}`,
        dial_code: c.dial_code
      }));
    }
    return [];
  }

  async setCurrenciesInForm() {
    const options = await this.getCurrencies();
    this.allCurrencies = options; // Store for dial code lookup
    for (let i = 0; i < this.fields.length; i++) {
      for (let j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key === 'currency') {
          fl.props.options = options;
        }
      }
    }
  }
  async onSubmit(model) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    if (this.form.valid) {
      let d = this.form.value;
      const res = await this.network.addBranchConfig(d);
      if (res) {
        this.utility.presentSuccessToast('Branch configuration added successfully!');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
    }
  }
}
