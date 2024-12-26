import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  onSubmit(arg0: any) {
    throw new Error('Method not implemented.');
  }

  id;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
  }
  initialize() {
    // Fetch the data from the server
  }

  form = new FormGroup({});
  model = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    city: '',
    state: '',
    country: '',
    image: null,
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
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
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
          className: 'col-md-4 col-12'
        },
        {
          key: 'password',
          type: 'input',
          props: {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            required: true,
            minLength: 6
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'address_line',
          type: 'input',
          props: {
            label: 'Address Line',
            placeholder: 'Enter address',
            required: true
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'city',
          type: 'input',
          props: {
            label: 'City',
            placeholder: 'Enter city',
            required: false // nullable
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'state',
          type: 'input',
          props: {
            label: 'State',
            placeholder: 'Enter state',
            required: false // nullable
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'country',
          type: 'input',
          props: {
            label: 'Country',
            placeholder: 'Enter country',
            required: false // nullable
          },
          className: 'col-md-4 xcol-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Image',
            placeholder: 'Enter image ',
            type: 'file'
          },
          className: 'col-md-4 col-12'
        },

        {
          key: 'restaurant',
          type: 'select',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Enter Restaurant  name',
            options: [],
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: '',
            type: 'tel'
            // pattern: '^\\+?[1-9]\\d{1,14}$', // Example pattern for international numbers
          },
          className: 'col-md-4 col-12'
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
          className: 'col-md-3 col-12'
        },
        {
          key: 'role',
          type: 'select',
          props: {
            label: 'Role',
            placeholder: 'Select a role',
            required: true,
            options: []
          },
          className: 'col-md-4 col-12'
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
          className: 'col-md-4 col-12'
        }
      ]
    }
  ];
}
