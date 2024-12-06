import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoicesComponent {

  form = new FormGroup({});
  model = {
    customer: '',
    invoice_date: '',
    products: [],
    status: 'draft',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'customer',
          type: 'input',
          props: {
            label: 'Customer Name',
            placeholder: 'Enter customer name',
            required: true,
          },
          className: 'col-md-6 col-12' // 2 columns on md+, full width on small screens
        },
        {
          key: 'invoice_date',
          type: 'input',
          props: {
            label: 'Invoice Date',
            placeholder: 'Select invoice date',
            type: 'date',
            required: true
          },
          className: 'col-md-6 col-12',
        },
      ],
    },
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            options: [
              { value: 'draft', label: 'Draft' },
              { value: 'sent', label: 'Sent' },
              { value: 'paid', label: 'Paid' },
            ],
          },
          className: 'col-md-6 col-12',
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'products',
          type: 'repeat',
          props: {
            label: 'Products',
            addText: 'Add Product',
          },
          fieldArray: {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'product_name',
                type: 'input',
                props: {
                  label: 'Product Name',
                  placeholder: 'Enter product name',
                  required: true,
                },
                className: 'col-md-6 col-12',
              },
              {
                key: 'product_price',
                type: 'input',
                props: {
                  label: 'Price',
                  placeholder: 'Enter price',
                  type: 'number',
                  required: true,
                },
                className: 'col-md-6 col-12',
              },
            ],
          },
        },
      ],
    },
  ];

  constructor(
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService
  ) {}

  async onSubmit(model: any) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      const res = await this.network.addInvoice(this.form.value); // Assuming `addInvoice` API is available
      if (res) {
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
    }
  }
}
