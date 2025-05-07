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
    phone: '',
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
            description: 'Name must be between 3 and 50 characters.'
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
            description: 'Enter a valid email address.'
          },
          validators: {
            email: {
              expression: (c: AbstractControl) => c.value && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(c.value),
              message: 'Please enter a valid email address.'
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
            description: 'Password must be at least 8 characters long.'
          },
          validators: {
            minLength: {
              expression: (c: AbstractControl) => c.value && c.value.length >= 8,
              message: 'Password must be at least 8 characters long.'
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
            description: 'Address must not exceed 100 characters.'
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
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'XXX-XXX-XXXX',
            type: 'tel',
            required: false,
            pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
            description: 'Enter a valid phone number in the format XXX-XXX-XXXX.'
          },
          validators: {
            pattern: {
              expression: (c: AbstractControl) => !c.value || /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(c.value),
              message: 'Please enter a valid phone number in the format XXX-XXX-XXXX.'
            }
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'role_id',
          type: 'select',
          props: {
            label: 'Role',
            placeholder: 'Select a role',
            required: true,
            options: [],
            description: 'Please select a valid role.'
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
            description: 'Select the user status.'
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
            description: 'City name must not exceed 50 characters.'
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
            description: 'State name must not exceed 50 characters.'
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
            description: 'Country name must not exceed 50 characters.'
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
            description: 'Upload a valid image file.'
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
  async onSubmit(model) {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation styles
      this.form.markAllAsTouched();
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
