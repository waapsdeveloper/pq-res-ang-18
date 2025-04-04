import { Component,ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrl: './add-coupons.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddCouponsComponent {
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
            required: true,
            minLength: 3
          },
          className: 'col-md-2 col-12' // 6 columns on md+, full width on small screens
        },
        {
          key: 'discount_value',
          type: 'input',
          props: {
            label: 'Discount',
            placeholder: 'Enter discount',
            required: true,
            type: 'number', // Ensures numeric input
            max: 100 // Constraint for maximum value
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'discount_type',
          type: 'select',
          props: {
            label: 'Discount Type',
            placeholder: 'Enter discount type',
            required: true,
            options: [
              { value: 'percentage', label: 'Percentage' },
              { value: 'fixed', label: 'Fixed' }
            ]
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'is_active',
          type: 'select',
          props: {
            label: 'Status',
            placeholder: 'Select status',
            required: true,
            options: [
              { value: true, label: 'Active' },
              { value: false, label: 'Inactive' }
            ]
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'usage_limit',
          type: 'input',
          props: {
            label: 'Usage Limit',
            placeholder: 'Enter usage limit',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'usage_count',
          type: 'input',
          props: {
            label: 'Usage Count',
            placeholder: 'Enter Usage Count',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'expires_at',
          type: 'input',
          templateOptions: {
            label: 'Expires at ',
            type: 'date',
            placeholder: 'Select a date',
            required: true
          },
          className: 'col-md-2 col-12'
        }
      ]
    }
  ];

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);

    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;

      const res = await this.network.addCoupon(d);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Table added Succesfully!');

        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }

  // Method to handle file input change
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Read file as Base64 string
      reader.onload = () => {
        const base64String = reader.result as string;

        // Update the form control with the Base64 string
        // this.bForm.patchValue({ image: base64String });

        // if (this.imageInputPlaceholder) {
        //   this.imageInputPlaceholder.nativeElement.style.backgroundImage = `url(${base64String})`;
        // }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(file); // Convert file to Base64
    }
  }
}
