import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {

  form = new FormGroup({});
  model = {
    name: 'Restaurant one',
    image: '',
    address: '',
    phone: '8957985674',
    email: 'restaurant1@mail.com',
    website: '',
    opening_hours: '',
    // schedule: [
    //   { day: 'Monday', status: false, start_time: '', end_time: '' },
    //   { day: 'Tuesday', status: false, start_time: '', end_time: '' },
    //   { day: 'Wednesday', status: false, start_time: '', end_time: '' },
    //   { day: 'Thursday', status: false, start_time: '', end_time: '' },
    //   { day: 'Friday', status: false, start_time: '', end_time: '' },
    //   { day: 'Saturday', status: false, start_time: '', end_time: '' },
    //   { day: 'Sunday', status: false, start_time: '', end_time: '' },
    // ],
    description: '',
    rating: Math.floor(Math.random() * 6),
    status: 'active',
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
            placeholder: 'Enter phone number',
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


        // {
        //   key: 'image',
        //   type: 'input',
        //   props: {
        //     label: 'Image',
        //     placeholder: 'Enter image URL',
        //     type: 'file'
        //   },
        //   className: 'col-md-4 col-12'
        // },
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
        },
      ],
    },
//     {
//       key: 'schedule_table',
//       fieldGroupClassName: 'col-12 table-responsive', // Full-width table
//       fieldGroup: [
//         {
//           key: 'schedule',
//           fieldGroupClassName: 'row',
//           fieldGroup: [
//             // Define each day of the week as a separate field group
//             ...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => ({
//               fieldGroupClassName: 'row border p-2', // Individual row for each day
//               fieldGroup: [
//                 {
//                   key: `${day.toLowerCase()}_day`, // Unique key for each day
//                   type: 'input',
//                   props: {
//                     label: 'Day',
//                     value: day,
//                     disabled: true, // Static day name
//                   },
//                   className: 'col-md-3 col-12',
//                 },
//                 {
//                   key: `${day.toLowerCase()}_status`,
//                   type: 'checkbox',
//                   props: {
//                     label: 'Active',
//                   },
//                   className: 'col-md-3 col-12',
//                 },
//                 {
//                   key: `${day.toLowerCase()}_start_time`,
//                   type: 'input',
//                   props: {
//                     label: 'Start Time',
//                     type: 'time',
//                   },
//                   className: 'col-md-3 col-12',
//                 },
//                 {
//                   key: `${day.toLowerCase()}_end_time`,
//                   type: 'input',
//                   props: {
//                     label: 'End Time',
//                     type: 'time',
//                   },
//                   className: 'col-md-3 col-12',
//                 },
//               ],
//             })),
//           ],

//       props: {
//         label: 'Weekly Schedule',
//         description: 'Set the schedule for each day of the week.',
//       },
//     },
//   ],
// },
   ];


  constructor(
    private fb: FormBuilder,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService
  ) {
  }



  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;
      const res = await this.network.addRestaurant(d);
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
