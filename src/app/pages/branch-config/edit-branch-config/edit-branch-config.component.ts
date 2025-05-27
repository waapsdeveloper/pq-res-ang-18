import { CurrencyService } from 'src/app/services/currency.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-branch-config',
  templateUrl: './edit-branch-config.component.html',
  styleUrl: './edit-branch-config.component.scss'
})
export class EditBranchConfigComponent implements OnInit {
  form: FormGroup<{ [key: string]: any }> = new FormGroup({});
  model = {
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
          type: 'input',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Select restaurant',
            required: true,
            readonly: true
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
            options: []
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'dial_code',
          type: 'input',
          props: {
            label: 'Dial Code',
            placeholder: 'Enter dial code (e.g. +1)',
            required: true
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
            max: 100,
            required: true
          },
          className: 'col-md-6 col-12'
        }
      ]
    }
  ];
  id: any;
  allCurrencies: any;
  data: any;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService,
    private route: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);

    // this.setBranchesInForm();
    this.setCurrenciesInForm();
    this.loadBranchConfig();

    this.form.valueChanges.subscribe((value) => {
      if (value['currency']) {
        const selectedCurrency = this.allCurrencies.find((c) => c.value === value['currency']);
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
      return dm.map((r) => ({
        value: r.name,
        label: r.name
      })) as any[];
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

  async loadBranchConfig() {
    try {
      const res = await this.network.getBranchConfigById(this.id);
      this.data = JSON.parse(localStorage.getItem('restaurant'));

      if (res && res.data && res.data.branch_config) {
        // Patch only the editable fields from branch_config
        this.model = {
          branch_id: res.data.branch_config.branch.name,
          tax: res.data.branch_config.tax,
          currency: res.data.branch_config.currency,
          dial_code: res?.data.restaurant.dial_code // Set this if you have it in the response, otherwise leave blank or fetch by currency
        };
        this.form.patchValue(this.model);
      } else {
        // Fallback in case of a failed response
        if (this.data && this.data.name) {
          this.model.branch_id = this.data.name;
          this.form.patchValue({ branch_id: this.data.name });
        }
      }
    } catch (error) {
      console.error('Error loading branch config:', error);
      // Fallback in case of an error
      const data = JSON.parse(localStorage.getItem('restaurant'));
      if (data && data.name) {
        this.model.branch_id = data.name;
        this.form.patchValue({ branch_id: data.name });
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
      d['branch_id'] = this.data.id;
      const res = await this.network.updateBranchConfig(d, this.id);
      console.log('Response from updateBranchConfig:', res.data);
      if (res) {
        const data = res.data;
        const R = data.restaurant;
        localStorage.setItem('restaurant', JSON.stringify(R));
        localStorage.setItem('restaurant_id', R.id);
        this.currencyService.setCurrency(data.branch_config.currency);
        this.currencyService.setTax(data.branch_config.tax);
        data.branch_config.currency;
        this.utility.presentSuccessToast('Branch configuration updated successfully.');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
    }
  }
}
