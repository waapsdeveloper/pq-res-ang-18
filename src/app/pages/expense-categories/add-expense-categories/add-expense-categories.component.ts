import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-expense-categories',
  templateUrl: './add-expense-categories.component.html',
  styleUrl: './add-expense-categories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddExpenseCategoriesComponent {
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
            required: true // Ensure required is true
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

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.setRoleInForm();
    this.setRestaurantsInForm();
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
  async setRestaurantsInForm() {
    const res = await this.getRestaurants();
    console.log(res);

    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key == 'restaurant_id') {
          fl.props.options = res;
        }
      }
    }
  }
  async setRoleInForm() {
    const res = await this.getRoles();
    console.log(res);

    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key == 'role') {
          fl.props.options = res;
        }
      }
    }
  }

  // get roles array
  async getRoles(): Promise<any[]> {
    let obj = {
      search: ''
    };
    const res = await this.network.getRoles(obj);

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

  async onSubmit(model) {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation styles
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;
      d['image'] = this.model['imageBase64'];
      const res = await this.network.addExpenseCategory(d);
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
