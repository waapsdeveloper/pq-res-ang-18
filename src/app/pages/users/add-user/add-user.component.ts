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
    address: '',
    role: '',
    address:'',
    city:'',
    state:'',
    country:'',
    image:null,
    status: '',
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
          },
          className: 'col-md-4 col-12', // 3 columns on md+, full width on small screens
        },

        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email Address',
            placeholder: 'Enter email',
            required: true,
            type: 'email',
          },
          className: 'col-md-4 col-12',
        },
        {
          key: 'password',
          type: 'input',
          props: {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            required: true,
            minLength: 6,
          },
          className: 'col-md-4 col-12',
        },
        {
          key: 'address_line',
          type: 'input',
          props: {
            label: 'Address Line',
            placeholder: 'Enter address',
            required: true,
          },
          className: 'col-md-4 col-12',
        },
        {
          key: 'city',
          type: 'input',
          props: {
            label: 'City',
            placeholder: 'Enter city',
            required: false, // nullable
          },
          className: 'col-md-4 col-12',
        },
        {
          key: 'state',
          type: 'input',
          props: {
            label: 'State',
            placeholder: 'Enter state',
            required: false, // nullable
          },
          className: 'col-md-4 col-12',
        },
        {
          key: 'country',
          type: 'input',
          props: {
            label: 'Country',
            placeholder: 'Enter country',
            required: false, // nullable
          },
          className: 'col-md-4 xcol-12',
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
        },
      ],

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
            type: 'tel',
            // pattern: '^\\+?[1-9]\\d{1,14}$', // Example pattern for international numbers
          },
          className: 'col-md-4 col-12',
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'XXX- XXX- XXXX',
            type: 'tel',
            // pattern: '^\\+?[1-9]\\d{1,14}$', // Example pattern for international numbers
          },
          className: 'col-md-3 col-12',
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
          className: 'col-md-4 col-12',
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
              { value: 'inactive', label: 'Inactive' },
            ],
          },
          className: 'col-md-4 col-12',
        },
      ],
    },
  ];




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
        if (fl.key == 'restaurant') {
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
        if(fl.key == 'role'){
          fl.props.options = res;
        }
      }
    }



  }

  // get roles array
  async getRoles(): Promise<any[]> {
    let obj = {
      search: ''
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

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;
      const res = await this.network.addUser(d);
      console.log(res);
      if (res) {
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
