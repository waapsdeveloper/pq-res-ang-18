import { Component, ViewChild, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddUserComponent implements OnInit {
  form = new FormGroup({});
  model = {
    name: '',
    email: '',
    password: '',
    phone: {
      countryCode: '',
      number: ''
    },
    address: '',
    role_id: '',
    city: '',
    state: '',
    country: '',
    image: '',
    imageBase64: '',
    status: 'active' // Set default value to "active"
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Name',
            placeholder: 'Enter user name',
            required: true,
            minLength: 3,
            maxLength: 50,
            validation: {
              show: (field) => (field.formControl.touched || field.formControl.dirty) && field.formControl.invalid
            }
          },
          validators: {
            minLength: {
              expression: (c: AbstractControl) => c.value && c.value.length >= 3,
              message: 'Name must be at least 3 characters long.'
            },
            maxLength: {
              expression: (c: AbstractControl) => c.value && c.value.length <= 50,
              message: 'Name must be no longer than 50 characters.'
            }
          },
          validation: {
            messages: {
              required: 'This name  field is required.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email Address',
            placeholder: 'Enter email',
            required: true,
            type: 'email',
            validation: {
              show: (field) => (field.formControl.touched || field.formControl.dirty) && field.formControl.invalid
            }
          },
          validators: {
            email: {
              expression: (c: AbstractControl) => c.value && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(c.value),
              message: 'Please enter a valid email address.'
            }
          },
          validation: {
            messages: {
              required: 'This field is required.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'password',
          type: 'input',
          props: {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            required: true,
            minLength: 8,
            validation: {
              show: (field) => (field.formControl.touched || field.formControl.dirty) && field.formControl.invalid
            }
          },
          validators: {
            minLength: {
              expression: (c: AbstractControl) => c.value && c.value.length >= 8,
              message: 'Password must be at least 8 characters long.'
            }
          },
          validation: {
            messages: {
              required: 'This password field is required.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address Line',
            placeholder: 'Enter address',
            required: false,
            maxLength: 100,
            validation: {
              show: (field) => field.formControl && field.formControl.invalid && field.formControl.focused
            }
          },
          validators: {
            maxLength: {
              expression: (c: AbstractControl) => !c.value || c.value.length <= 100,
              message: 'Address must be no longer than 100 characters.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'phone',
          type: 'phone-input',
          props: {
            label: 'Phone Number'
          },
          fieldGroup: [
            {
              key: 'countryCode',
              type: 'select',
              templateOptions: {
                label: 'Country Code',
                required: true,
                options: []
              }
            },
            {
              key: 'number',
              type: 'input',
              templateOptions: {
                label: 'Phone Number',
                required: true,
                placeholder: 'e.g. 3123456789',
                type: 'tel'
              }
            }
          ],
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'role_id',
          type: 'select',
          props: {
            label: 'Role',
            placeholder: 'Select a role',
            required: true,
            options: [],
            validation: {
              show: (field) => (field.formControl.touched || field.formControl.dirty) && field.formControl.invalid
            }
          },
          validation: {
            messages: {
              required: 'role selection is required.'
            }
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            placeholder: 'Select status',
            required: false,
            defaultValue: 'active',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ],
            validation: {
              show: (field) => field.formControl && field.formControl.invalid && field.formControl.focused
            }
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'city',
          type: 'input',
          props: {
            label: 'City',
            placeholder: 'Enter city',
            required: false,
            maxLength: 50,
            validation: {
              show: (field) => field.formControl && field.formControl.invalid && field.formControl.focused
            }
          },
          validators: {
            maxLength: {
              expression: (c: AbstractControl) => !c.value || c.value.length <= 50,
              message: 'City name must be no longer than 50 characters.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'state',
          type: 'input',
          props: {
            label: 'State',
            placeholder: 'Enter state',
            required: false,
            maxLength: 50,
            validation: {
              show: (field) => field.formControl && field.formControl.invalid && field.formControl.focused
            }
          },
          validators: {
            maxLength: {
              expression: (c: AbstractControl) => !c.value || c.value.length <= 50,
              message: 'State name must be no longer than 50 characters.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'country',
          type: 'input',
          props: {
            label: 'Country',
            placeholder: 'Enter country',
            required: false,
            maxLength: 50,
            validation: {
              show: (field) => field.formControl && field.formControl.invalid && field.formControl.focused
            }
          },
          validators: {
            maxLength: {
              expression: (c: AbstractControl) => !c.value || c.value.length <= 50,
              message: 'Country name must be no longer than 50 characters.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Profile Picture',
            placeholder: 'Upload an image',
            type: 'file',
            accept: 'image/*',
            required: false,
            validation: {
              show: (field) => field.formControl && field.formControl.invalid && field.formControl.focused
            }
          },
          className: 'formly-image-wrapper-3232 col-md-6 col-12'
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
    this.setCountryCodesInForm();
  }

  async getRestaurants(): Promise<any[]> {
    let obj = {
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
        if (fl.key == 'role_id') {
          fl.props.options = res;
        }
      }
    }
  }

  // get roles array
  async getRoles(): Promise<any[]> {
    let obj = {
      search: '',

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
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

  async getCountryCodes(): Promise<any[]> {
    const res = await this.network.getCurrencies();
    if (res && res['data']) {
      return res['data'].map((c) => ({
        label: `${c.dial_code} - ${c.country}`,
        value: c.dial_code
      }));
    }
    return [];
  }

  async setCountryCodesInForm() {
    const options = await this.getCountryCodes();
    for (let i = 0; i < this.fields.length; i++) {
      for (let j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key === 'phone') {
          // Find the countryCode field inside phone fieldGroup
          if (fl.fieldGroup) {
            for (let k = 0; k < fl.fieldGroup.length; k++) {
              let phoneField = fl.fieldGroup[k];
              if (phoneField.key === 'countryCode') {
                phoneField.templateOptions.options = options;
              }
            }
          }
        }
      }
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
        // this.fields[0].fieldGroup[6].props['value'] = base64String; // Update the field value
        // this.fields[0].fieldGroup[6].formControl.setValue(base64String); // Update the form control value

        // field.formControl.setValue(base64String); // Update the form control value
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }
  onModelChange(model) {
    console.log(this.form.value); // { countryCode: '...', number: '...' }
  }
  async onSubmit(model) {
    console.log('model', model);
    if (this.form.invalid) {
      const requiredFields = ['name', 'email', 'password', 'role_id'];
      requiredFields.forEach((field) => {
        const control = this.form.get(field);
        if (control && control.invalid) {
          control.markAsTouched();
          control.markAsDirty(); // Ensure the field is marked dirty
        }
      });
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      d['image'] = this.model.imageBase64;

      const res = await this.network.addUser(d);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('User Created Succesfully!');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
