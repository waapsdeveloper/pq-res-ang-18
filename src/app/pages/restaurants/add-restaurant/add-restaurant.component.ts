import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddRestaurantComponent {
  form = new FormGroup({});
  model = {
    name: 'Restaurant one',
    copyright_text: '',
    // image: '',
    imageBase64: '',
    // favicon: '',
    faviconBase64: '',
    logo: '',
    logoBase64: '',
    address: '',
    phone: '8957985674',
    email: 'restaurant1@mail.com',
    website: '',
    schedule: {
      monday_day: 'Monday',
      monday_start_time: '09:00',
      monday_end_time: '17:00',
      monday_status: 'active',

      tuesday_day: 'Tuesday',
      tuesday_start_time: '09:00',
      tuesday_end_time: '17:00',
      tuesday_status: 'active',

      wednesday_day: 'Wednesday',
      wednesday_start_time: '09:00',
      wednesday_end_time: '17:00',
      wednesday_status: 'active',

      thursday_day: 'Thursday',
      thursday_start_time: '09:00',
      thursday_end_time: '17:00',
      thursday_status: 'active',

      friday_day: 'Friday',
      friday_start_time: '10:00',
      friday_end_time: '20:00',
      friday_status: 'active',

      saturday_day: 'Saturday',
      saturday_start_time: '10:00',
      saturday_end_time: '18:00',
      saturday_status: 'inactive',

      sunday_day: 'Sunday',
      sunday_start_time: '10:00',
      sunday_end_time: '16:00',
      sunday_status: 'inactive'
    },
    description: '',
    rating: Math.floor(Math.random() * 6),
    status: 'active'
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Enter restaurant name',
            required: true, // Ensure required is true
            minLength: 3
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: 'Enter address',
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'Enter phone number',
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email Address',
            placeholder: 'Enter email',
            type: 'email',
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'website',
          type: 'input',
          props: {
            label: 'Website',
            placeholder: 'Enter website URL',
            pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'copyright_text',
          type: 'textarea',
          props: {
            label: 'Copyright text',
            placeholder: 'Enter copy right text',
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter description',
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        },
        // {
        //   key: 'image',
        //   type: 'input',
        //   props: {
        //     label: 'Image',
        //     placeholder: 'Enter image URL',
        //     type: 'file',
        //     accept: 'image/*',
        //     change: (field, event) => this.onFileChange(field, event, 'imageBase64'),
        //     required: true // Ensure required is true
        //   },
        //   className: 'formly-image-wrapper-3232 col-md-6 col-12'
        // },
        // {
        //   key: 'favicon',
        //   type: 'input',
        //   props: {
        //     label: 'favicon',
        //     placeholder: 'Enter image URL',
        //     type: 'file',
        //     accept: 'image/*',
        //     change: (field, event) => this.onFileChange(field, event, 'faviconBase64'),
        //     required: true // Ensure required is true
        //   },
        //   className: 'formly-image-wrapper-3232 col-md-6 col-12'
        // },
        {
          key: 'logo',
          type: 'input',
          props: {
            label: 'Restaurant Logo',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'logoBase64'),
            required: true // Ensure required is true
          },
          className: 'formly-image-wrapper-3232 col-md-6 col-12'
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
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        }
      ]
    },
    {
      key: 'schedule',
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        ...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => ({
          fieldGroupClassName: 'row col-12',
          fieldGroup: [
            {
              key: `${day.toLowerCase()}_day`,
              type: 'input',
              props: {
                label: 'Day',
                value: `${day}`,
                readonly: true,
                required: true // Ensure required is true
              },
              className: 'col-md-3 col-12'
            },
            {
              key: `${day.toLowerCase()}_start_time`,
              type: 'input',
              props: {
                label: 'Start Time',
                type: 'time',
                required: true // Ensure required is true
              },
              className: 'col-md-3 col-12'
            },
            {
              key: `${day.toLowerCase()}_end_time`,
              type: 'input',
              props: {
                label: 'End Time',
                type: 'time',
                required: true // Ensure required is true
              },
              className: 'col-md-3 col-12'
            },
            {
              key: `${day.toLowerCase()}_status`,
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
        }))
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService,
    public grService: GlobalRestaurantService,
  ) {}

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
      // Mark all fields as touched to trigger validation styles
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      let d = Object.assign({}, this.form.value);

      // d['image'] = this.model.imageBase64;
      // d['favicon'] = this.model.faviconBase64;
      d['logo'] = this.model.logoBase64;
      d['schedule'] = [
        {
          day: 'Monday',
          start_time: this.model.schedule.monday_start_time || '0:00',
          end_time: this.model.schedule.monday_end_time || '10:00',
          status: this.model.schedule.monday_status || 'inactive'
        },
        {
          day: 'Tuesday',
          start_time: this.model.schedule.tuesday_start_time || '0:00',
          end_time: this.model.schedule.tuesday_end_time || '10:00',
          status: this.model.schedule.tuesday_status || 'inactive'
        },
        {
          day: 'Wednesday',
          start_time: this.model.schedule.wednesday_start_time || '0:00',
          end_time: this.model.schedule.wednesday_end_time || '10:00',
          status: this.model.schedule.wednesday_status || 'inactive'
        },
        {
          day: 'Thursday',
          start_time: this.model.schedule.thursday_start_time || '0:00',
          end_time: this.model.schedule.thursday_end_time || '10:00',
          status: this.model.schedule.thursday_status || 'inactive'
        },
        {
          day: 'Friday',
          start_time: this.model.schedule.friday_start_time || '10:00',
          end_time: this.model.schedule.friday_end_time || '10:00',
          status: this.model.schedule.friday_status || 'inactive'
        },
        {
          day: 'Saturday',
          start_time: this.model.schedule.saturday_start_time || '0:00',
          end_time: this.model.schedule.saturday_end_time || '10:00',
          status: this.model.schedule.saturday_status || 'inactive'
        },
        {
          day: 'Sunday',
          start_time: this.model.schedule.sunday_start_time || '0:00',
          end_time: this.model.schedule.sunday_end_time || '10:00',
          status: this.model.schedule.sunday_status || 'inactive'
        }
      ];

      const res = await this.network.addRestaurant(d);
      console.log(res);
      if (res && res.restaurant) {

        this.utility.presentSuccessToast('Restaurant added Successfully!');
        let item = res.restaurant;
        this.grService.setRestaurant(item.id, item.name);

        // Call API to set default restaurant
        const data = {
          is_active: 1
        };

        await this.network.setActiveRestaurant(data, item.id);


        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
    }
  }
}
