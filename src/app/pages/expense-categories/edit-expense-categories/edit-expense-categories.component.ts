import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-expense-categories',
  templateUrl: './edit-expense-categories.component.html',
  styleUrl: './edit-expense-categories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditExpenseCategoriesComponent implements OnInit {
  form = new FormGroup({});
  model = {
    category_name: '',
    daily_estimate: '',
    weekly_estimate: '',
    monthly_estimate: '',
    description: '',
    image: '',
    imageBase64: '',
    status: 'active'
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'category_name',
          type: 'input',
          props: {
            label: 'Expense Category Name',
            placeholder: 'Enter category name',
            required: true
          },
          className: 'formly-image-wrapper-3232 col-md-3 col-12'
        },
        {
          key: 'daily_estimate',
          type: 'input',
          props: {
            label: 'Daily Estimate',
            placeholder: 'Enter daily estimate',
            type: 'number',
            min: 0
          },
          className: 'formly-image-wrapper-3232 col-md-3 col-12'
        },
        {
          key: 'weekly_estimate',
          type: 'input',
          props: {
            label: 'Weekly Estimate',
            placeholder: 'Enter weekly estimate',
            type: 'number',
            min: 0
          },
          className: 'formly-image-wrapper-3232 col-md-3 col-12'
        },
        {
          key: 'monthly_estimate',
          type: 'input',
          props: {
            label: 'Monthly Estimate',
            placeholder: 'Enter monthly estimate',
            type: 'number',
            min: 0
          },
          className: 'formly-image-wrapper-3232 col-md-3 col-12'
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter a description',
            required: false
          },
          className: 'formly-image-wrapper-3232 col-12'
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
            required: false // Ensure required is true
          },
          className: 'formly-image-wrapper-3232 col-md-3 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ],
            required: true // Ensure required is true
          },
          className: 'formly-select-wrapper-3232 col-md-3 col-12'
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
    this.setFormValuesFromApi();
  }

  async setFormValuesFromApi() {
    const res = await this.network.getExpenseCategoryById(this.id);
    console.log(res);
    if (res && res.expense_category) {
      // Patch the model with API data
      this.model = {
        category_name: res.expense_category.category_name || '',
        daily_estimate: res.expense_category.daily_estimate || '',
        weekly_estimate: res.expense_category.weekly_estimate || '',
        monthly_estimate: res.expense_category.monthly_estimate || '',
        description: res.expense_category.description || '',
        image: res.expense_category.image || '',
        imageBase64: '', // You may want to handle this if editing image
        status: res.expense_category.status || 'active'
      };
      this.form.patchValue(this.model);
    }
  }
  onFileChange(field, event: Event, type: string = 'image') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        console.log(base64String);

        this.model[type] = base64String; // Update the model
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }

  async onSubmit(model) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }
    if (this.form.valid) {
      let d = { ...this.form.value };
      d['image'] = this.model.imageBase64; // Use the base64 image
      const res = await this.network.updateExpenseCategory(this.id, d);
      if (res) {
        this.utility.presentSuccessToast('Category updated successfully!');
        this.nav.pop();
      } else {
        this.utility.presentFailureToast(res?.message || 'Failed to update category.');
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
    }
  }
}
