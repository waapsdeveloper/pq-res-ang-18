import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditExpenseComponent implements OnInit {
  form = new FormGroup({});
  model = {
    name: '',
    amount: '',
    expense_category_id: '',
    type: 'one-time',
    date: '',
    status: 'unpaid',
    description: '',
    image: '',
    imageBase64: '',
    src_img: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Expense Name',
            placeholder: 'Enter expense name',
            required: true
          },
          className: 'formly-select-wrapper-3232 col-md-4 col-12'
        },
        {
          key: 'amount',
          type: 'input',
          props: {
            label: 'Amount',
            placeholder: 'Enter amount',
            type: 'number',
            min: 0,
            required: true
          },
          className: 'formly-select-wrapper-3232 col-md-4 col-12'
        },
        {
          key: 'expense_category_id',
          type: 'select',
          props: {
            label: 'Category',
            placeholder: 'Select category',
            required: true,
            options: [] // Will be populated dynamically
          },
          className: 'formly-select-wrapper-3232 col-md-4 col-12'
        },
        {
          key: 'type',
          type: 'select',
          props: {
            label: 'Type',
            placeholder: 'Select type',
            required: true,
            options: [
              { value: 'recurring', label: 'Recurring' },
              { value: 'one-time', label: 'One-time' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-4 col-12'
        },
        {
          key: 'date',
          type: 'input',
          props: {
            label: 'Date',
            placeholder: 'Select date',
            type: 'date',
            required: true
          },
          className: 'col-md-4 col-12 formly-select-wrapper-3232'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            placeholder: 'Select status',
            required: true,
            options: [
              { value: 'paid', label: 'Paid' },
              { value: 'unpaid', label: 'Unpaid' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-4 col-12'
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter a description',
            required: false
          },
          className: 'formly-select-wrapper-3232 col-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Category Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'imageBase64'),
            required: false
          },
          className: 'formly-image-wrapper-3232 col-md-3 col-12'
        }
      ]
    }
  ];

  id: string;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.setCategoryInForm();
    this.loadExpenseDetails();
  }

  async setCategoryInForm() {
    const res = await this.getExpenseCategory();
    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key == 'expense_category_id') {
          fl.props.options = res;
        }
      }
    }
  }

  async getExpenseCategory(): Promise<any[]> {
    let obj = {
      search: '',
      perpage: 500,
      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };
    const res = await this.network.getExpenseCategories(obj);
    if (res && res['data']) {
      let d = res['data'];
      let dm = d['data'];
      return dm.map((r) => {
        return {
          value: r.id,
          label: r.category_name
        };
      }) as any[];
    }
    return [];
  }

  async loadExpenseDetails() {
    try {
      const res = await this.network.getExpenseById(this.id);

      if (res && res.expense) {
        this.model = {
          name: res.expense.name || '',
          amount: res.expense.amount || '',
          expense_category_id: res.expense.category.id || '',
          type: res.expense.type || 'one-time',
          date: res.expense.date || '',
          status: res.expense.status || 'unpaid',
          description: res.expense.description || '',
          image: res.expense.image || '',
          src_img: res.expense.image || '', //
          imageBase64: ''
        };
        this.form.patchValue(this.model);
      }
    } catch (error) {
      this.utility.presentFailureToast('Failed to load expense details.');
      console.error(error);
    }
  }

  onFileChange(field, event: Event, type: string = 'image') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.model[type] = base64String;
        this.model['src_img'] = base64String; // Store
      };
      reader.readAsDataURL(file);
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
      d['image'] = this.model['imageBase64'] || this.model['image'];
      const res = await this.network.updateExpense(this.id, d);
      if (res) {
        this.utility.presentSuccessToast('Expense updated successfully!');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
    }
  }
}
