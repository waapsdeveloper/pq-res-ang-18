import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-coupons',
  templateUrl: './edit-coupons.component.html',
  styleUrl: './edit-coupons.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditCouponsComponent implements OnInit {
  id;

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private fb: FormBuilder,
    private nav: NavService,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    this.setRestaurantsInForm();
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();
  }
  async getRestaurants(): Promise<any[]> {
    let obj = {
      search: '',
      perpage: 500,

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
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
  async setRestaurantsInForm() {
    const res = await this.getRestaurants();
    console.log(res);

    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl && fl.key === 'restaurant_id') {
          fl.props = fl.props || {}; // Ensure props exists
          fl.props.options = res;
        }
      }
    }
  }

  async initialize() {
    // Fetch the data from the server
    const res = await this.network.getTablesById(this.id);
    console.log(res);
    this.model = res.Rtable;
  }

  form = new FormGroup({});
  model = {
    code: '',
    discount_value: '',
    discount_type: '',
    usage_limit: '',
    usage_count: '',
    expires_at: '',
    is_active: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'code',
          type: 'input',
          props: {
            label: 'Coupon Code',
            placeholder: 'Enter coupon code',
            required: true, // Ensure required is true
            minLength: 3
          },
          className: 'col-md-6 col-12' // 6 columns on md+, full width on small screens
        },
        {
          key: 'discount_value',
          type: 'input',
          props: {
            label: 'Discount',
            placeholder: 'Enter discount',
            required: true, // Ensure required is true
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'discount_type',
          type: 'select',
          props: {
            label: 'Discount Type',
            placeholder: 'Enter discount type',
            required: true, // Ensure required is true
            options: [
              { value: 'percentage', label: 'Percentage' },
              { value: 'fixed', label: 'Fixed' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'is_active',
          type: 'select',
          props: {
            label: 'Status',
            placeholder: 'Select status',
            required: true, // Ensure required is true
            options: [
              { value: true, label: 'Active' },
              { value: false, label: 'Inactive' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'usage_limit',
          type: 'input',
          props: {
            label: 'Usage Limit',
            placeholder: 'Enter usage limit',
            required: true, // Ensure required is true
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'usage_count',
          type: 'input',
          props: {
            label: 'Usage Count',
            placeholder: 'Enter Usage Count',
            required: true, // Ensure required is true
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'expires_at',
          type: 'input',
          templateOptions: {
            label: 'Date of Birth',
            type: 'date',
            placeholder: 'Select a date',
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        }
      ]
    }
  ];

  async ngAfterViewInit() {
    const res = await this.network.getCouponById(this.id);
    let d = Object.assign({}, res.coupon);
    console.log(d);
    // Dynamic model assignment
    this.model = {
      code: d.code,
      discount_value: d.discount,
      discount_type: d.discount_type,
      usage_limit: d.usage_limit,
      usage_count: d.usage_count,
      expires_at: d.expires_at,
      is_active: d.is_active
    };
  }

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      const res = await this.network.updateCoupon(d, this.id);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Coupon Updated!');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
