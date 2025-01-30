import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrl: './add-message.component.scss'
})
export class AddMessageComponent {
  form = new FormGroup({});
  model = {
    identifier: '',
    no_of_seats: '',
    floor: '',
    //  location: '',
    description: '',
    status: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'identifier',
          type: 'input',
          props: {
            label: 'Name',
            placeholder: 'Enter table name',
            required: true,
            minLength: 3
          },
          className: 'col-md-2 col-12' // 6 columns on md+, full width on small screens
        },
        {
          key: 'no_of_seats',
          type: 'input',
          props: {
            label: 'Number of Seats',
            placeholder: 'Enter number of seats',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'floor',
          type: 'input',
          props: {
            label: 'Floor',
            placeholder: 'Enter floor description',
            required: true,
            maxLength: 500 // Constraint for maximum length
          },
          className: 'col-md-2 col-12'
        },

        // {
        //   key: 'location',
        //   type: 'input',
        //   props: {
        //     label: 'Location',
        //     placeholder: 'Near west wall',
        //     required: true,
        //   },
        //   className: 'col-md-6 col-12',
        // },
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
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter a description',
            required: false
          },
          className: 'col-md-2 col-12' // Full width for description
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

      restaurant_id: localStorage.getItem('restuarant_id') ? localStorage.getItem('restuarant_id') : -1
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
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;
      const res = await this.network.addTable(d);
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
