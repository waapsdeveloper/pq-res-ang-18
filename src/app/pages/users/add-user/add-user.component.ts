import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {


  form = new FormGroup({});
  model = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address:'',
    role_id: '',
    city:'',
    state:'',
    country:'',
    image: '',
    imageBase64: '',
    status: '',
    restaurant_id: ''
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
            minLength: 3
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email Address',
            placeholder: 'Enter email',
            required: true,
            type: 'email'
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'password',
          type: 'input',
          props: {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',

            minLength: 6
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address Line',
            placeholder: 'Enter address',
            required: true
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'XXX- XXX- XXXX',
            type: 'tel'
            // pattern: '^\\+?[1-9]\\d{1,14}$', // Example pattern for international numbers
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'role_id',
          type: 'select',
          props: {
            label: 'Role',
            placeholder: 'Select a role',
            required: true,
            options: []
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            placeholder: 'Select status',
            required: true,
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'city',
          type: 'input',
          props: {
            label: 'City',
            placeholder: 'Enter city',
            required: false // nullable
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'state',
          type: 'input',
          props: {
            label: 'State',
            placeholder: 'Enter state',
            required: false // nullable
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'country',
          type: 'input',
          props: {
            label: 'Country',
            placeholder: 'Enter country',
            required: false // nullable
          },
          className: 'col-md-2 xcol-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'imageBase64')
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'restaurant_id',
          type: 'select',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Enter Restaurant  name',
            options: [],
            minLength: 3
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },

      ]
    }

  ]




  constructor(private nav: NavService, private network: NetworkService, private utility: UtilityService) {

  }

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

    for(var i = 0; i < this.fields.length; i++){
      for(var j = 0; j < this.fields[i].fieldGroup.length; j++) {

        let fl = this.fields[i].fieldGroup[j];
        if(fl.key == 'role_id'){
          fl.props.options = res;
        }
      }
    }



  }

  // get roles array
  async getRoles(): Promise<any[]> {
    let obj = {
      search: '',
      restaurant_id: localStorage.getItem('restuarant_id')

    }
    const res = await this.network.getRoles(obj);

    if (res && res['data']) {

      let d = res['data'];
      let dm = d['data'];
      return dm.map( r => {
        return {
          value: r.id,
          label: r.name
        }
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
    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      d['image'] = this.model.imageBase64;

      const res = await this.network.addUser(d);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('User Created Succesfully!')
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }

}
