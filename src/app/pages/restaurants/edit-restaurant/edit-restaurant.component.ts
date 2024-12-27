import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.scss'
})
export class EditRestaurantComponent implements OnInit {
  id;
  form = new FormGroup({});
  model = {
    name: 'Restaurant one',
    copyright_text: '',
    image: '',
    imageBase64: '',
    favicon: '',
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

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService
  ) { }

  ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();
  }

  async initialize() {
    // Fetch the data from the server;
    const res = await this.network.getRestaurantById(this.id);
    //   this.model= res.restaurant;
    console.log(res);

    let d = Object.assign({}, res.restaurant);
    this.model.name = d.name;
    this.model.copyright_text = d.copyright_text || '';
    this.model.image = d.image || '';
    this.model.favicon = d.favicon || '';
    this.model.logo = d.logo || '';
    this.model.address = d.address || '';
    this.model.phone = d.phone || '';
    this.model.email = d.email || '';
    this.model.website = d.website || '';
    this.model.description = d.description || '';
    this.model.rating = d.rating !== undefined ? d.rating : Math.floor(Math.random() * 6);
    this.model.status = d.status || 'active';

    // Map default timings if provided
    if (d.timings && Array.isArray(d.timings) && d.timings.length > 0) {
      d.timings.forEach((timing) => {
        const day = timing.day.toLowerCase();
        this.model.schedule[`${day}_day`] = timing.day || '';
        this.model.schedule[`${day}_start_time`] = timing.start_time || '09:00';
        this.model.schedule[`${day}_end_time`] = timing.end_time || '17:00';
        this.model.schedule[`${day}_status`] = timing.status || 'inactive';
      });
    }


    // .get('restaurant/'+this.id).subscribe((response: any) => {
    //   console.log('Response:', response);
    //   this.model = response.data;
    // });
  }


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
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: 'Enter address',
            required: true
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'Enter phone number'
            // pattern: /^[0-9]{10,15}$/
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email Address',
            placeholder: 'Enter email',
            type: 'email'
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'website',
          type: 'input',
          props: {
            label: 'Website',
            placeholder: 'Enter website URL',
            pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter description'
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'copyright_text',
          type: 'textarea',
          props: {
            label: 'Copyright text',
            placeholder: 'Enter copy right text'
          },
          className: 'col-md-4 col-12'
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
          className: 'col-md-4 col-12'
        },
        {
          key: 'favicon',
          type: 'input',
          props: {
            label: 'Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'faviconBase64')
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'logo',
          type: 'input',
          props: {
            label: 'Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'logoBase64')
          },
          className: 'col-md-4 col-12'
        },
        // {
        //   key: 'rating',
        //   type: 'input',
        //   props: {
        //     label: 'Rating',
        //     placeholder: 'Enter rating (0-5)',
        //     type: 'number',
        //     min: 0,
        //     max: 5,
        //     pattern: /^\d+(\.\d{1,2})?$/
        //   },
        //   className: 'col-md-4 col-12'
        // },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]
          },
          className: 'col-md-4 col-12'
        }
      ]
    },
    {
      key: 'schedule',
      fieldGroupClassName: 'row border p-2', // Bootstrap row
      fieldGroup: [
        ...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => ({
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: `${day.toLowerCase()}_day`, // Unique key for each day
              type: 'input',
              props: {
                label: 'Day',
                value: `${day}`,
                readonly: true // Static day name
              },
              className: 'col-md-3 col-12'
            },

            {
              key: `${day.toLowerCase()}_start_time`,
              type: 'input',
              props: {
                label: 'Start Time',
                type: 'time'
              },
              className: 'col-md-3 col-12'
            },
            {
              key: `${day.toLowerCase()}_end_time`,
              type: 'input',
              props: {
                label: 'End Time',
                type: 'time'
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
                ]
              },
              className: 'col-md-3 col-12'
            }
          ]
        }))
      ]
    }
  ];
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
  updateScheduleFromApi(apiData) {
    // Update the schedule field directly in the model
    apiData.timings.forEach(timing => {
      const dayKey = timing.day.toLowerCase(); // "monday", "tuesday", etc.
      this.model.schedule[`${dayKey}_start_time`] = timing.start_time;
      this.model.schedule[`${dayKey}_end_time`] = timing.end_time;
      this.model.schedule[`${dayKey}_status`] = timing.status;
    });
  }

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      d['image'] = this.model.imageBase64;
      d['favicon'] = this.model.faviconBase64;
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

      console.log(d);

      const res = await this.network.updateRestaurant(d, this.id);
      console.log(res);

      if (res) {
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
