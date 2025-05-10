import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent implements OnInit {
  id;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    this.setRoleInForm();
    this.setRestaurantsInForm();
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    // this.initialize();
  }
  // async initialize() {
  //   const res = await this.network.getUsersById(this.id);
  //   console.log(res);
  //   this.model = res.user;

  //   // Fetch the data from the server
  // }

  form = new FormGroup({});
  model = {
    name: '',
    email: '',
    // password: '',
    phone: '',
    address: '',
    role_id: '',
    city: '',
    state: '',
    country: '',
    image: '',
    imageBase64: '',
    status: ''
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
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'XXX-XXX-XXXX',
            type: 'tel',
            required: false,
            pattern: /^[0-9]{11}$/,
            validation: {
              show: (field) => field.formControl && field.formControl.invalid && field.formControl.focused
            }
          },
          validators: {
            pattern: {
              expression: (c: AbstractControl) => !c.value || /^[0-9]{11}$/.test(c.value),
              message: 'Please enter a valid phone number (11 digits).'
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
        if (fl.key == 'restaurant_id') {
          fl.props.options = res;
        }
      }
    }
  }
  async ngAfterViewInit() {
    const res = await this.network.getUsersById(this.id);
    let d = Object.assign({}, res.user);
    console.log(d.status, 'these are the result of the console ');
    // Dynamic model assignment
    this.model = {
      name: d.name || '', // Matches `model`
      email: d.email || '', // Matches `model`
      // password: d.password || '',       // Matches `model`
      phone: d.phone || '', // Matches `model`
      address: d.address || '', // Matches `model`
      role_id: d.role_id || '', // Matches `model`
      status: (d.status || '').toLowerCase(),
      city: d.city || '', // Matches `model`
      state: d.state || '', // Matches `model`
      country: d.country || '', // Matches `model`
      image: '', // Ensures `image` is an empty string
      imageBase64: d.imageBase64 || '' // Matches `model`
    };
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

      const res = await this.network.updateUser(d, this.id);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('User Information Updated!');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
