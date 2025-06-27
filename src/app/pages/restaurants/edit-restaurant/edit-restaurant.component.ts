import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditRestaurantComponent implements OnInit, AfterViewInit {
  id;
  form: FormGroup = new FormGroup({});
  model = {
    name: '',
    copyright_text: '',
    imageBase64: '',
    faviconBase64: '',
    logo: '',
    src_img: '',
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
    status: 'active',
    // Branch config properties
    branch_id: '',
    tax: '',
    currency: '',
    dial_code: '',
    // Meta data properties
    home_page_title: ''
  };

  // Branch config properties for orders tab
  allCurrencies: any;
  data: any;

  // Sidebar navigation
  activeSection: 'general' | 'timing' | 'order' = 'general';

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService,
    public grService: GlobalRestaurantService,
    private globaldata: GlobalDataService
  ) {}

  async ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();

    // Initialize branch config functionality for orders tab
    await this.setCurrenciesInForm();
    await this.loadBranchConfig();

    // Handle currency change for dial code
    this.form.valueChanges.subscribe((value: any) => {
      if (value && value['currency']) {
        const selectedCurrency = this.allCurrencies?.find((c: any) => c.value === value['currency']);
        if (selectedCurrency) {
          const dialCodeControl = this.form.get('dial_code');
          if (dialCodeControl) {
            (dialCodeControl as import('@angular/forms').FormControl).setValue(selectedCurrency.dial_code, { emitEvent: false });
          }
        }
      }
    });
  }

  async initialize() {
    // this.model.copyright_text = d.copyright_text || '';
    // this.model.image = d.image || '';
    // this.model.favicon = d.favicon || '';
    // this.model.logo = d.logo || '';
    // this.model.address = d.address || '';
    // this.model.phone = d.phone || '';
    // this.model.email = d.email || '';
    // this.model.website = d.website || '';
    // this.model.description = d.description || '';
    // this.model.rating = d.rating !== undefined ? d.rating : Math.floor(Math.random() * 6);
    // this.model.status = d.status || 'active';
    // // Map default timings if provided
    // if (d.timings && Array.isArray(d.timings) && d.timings.length > 0) {
    //   d.timings.forEach((timing) => {
    //     const day = timing.day.toLowerCase();
    //     this.model.schedule[`${day}_day`] = timing.day || '';
    //     this.model.schedule[`${day}_start_time`] = timing.start_time || '09:00';
    //     this.model.schedule[`${day}_end_time`] = timing.end_time || '17:00';
    //     this.model.schedule[`${day}_status`] = timing.status || 'inactive';
    //   });
    // }
    // .get('restaurant/'+this.id).subscribe((response: any) => {
    //   console.log('Response:', response);
    //   this.model = response.data;
    // });
  }

  async ngAfterViewInit() {
    // Fetch the data from the server;
    const res = await this.network.getRestaurantById(this.id);
    //   this.model= res.restaurant;
    console.log(res);

    let d = Object.assign({}, res.restaurant);

    this.model = {
      name: d.name || '',
      copyright_text: d.copyright_text || '',
      imageBase64: d.imageBase64 || '',
      faviconBase64: d.faviconBase64 || '',
      description: d.description || '',
      logo: '',
      src_img: d.logo || '', //
      logoBase64: d.logoBase64 || '',
      address: d.address || '',
      phone: d.phone || '',
      email: d.email || '',
      website: d.website || '',
      schedule: {
        monday_day: 'Monday',
        monday_start_time: d.schedule && d.schedule.length > 0 && d.schedule[0].start_time ? d.schedule[0].start_time : '09:00',
        monday_end_time: d.schedule && d.schedule.length > 0 && d.schedule[0].end_time ? d.schedule[0].end_time : '17:00',
        monday_status: d.schedule && d.schedule.length > 0 && d.schedule[0].status ? d.schedule[0].status.toLowerCase() : 'inactive',

        tuesday_day: 'Tuesday',
        tuesday_start_time: d.schedule && d.schedule.length > 1 && d.schedule[1].start_time ? d.schedule[1].start_time : '09:00',
        tuesday_end_time: d.schedule && d.schedule.length > 1 && d.schedule[1].end_time ? d.schedule[1].end_time : '17:00',
        tuesday_status: d.schedule && d.schedule.length > 1 && d.schedule[1].status ? d.schedule[1].status.toLowerCase() : 'inactive',

        wednesday_day: 'Wednesday',
        wednesday_start_time: d.schedule && d.schedule.length > 2 && d.schedule[2].start_time ? d.schedule[2].start_time : '09:00',
        wednesday_end_time: d.schedule && d.schedule.length > 2 && d.schedule[2].end_time ? d.schedule[2].end_time : '17:00',
        wednesday_status: d.schedule && d.schedule.length > 2 && d.schedule[2].status ? d.schedule[2].status.toLowerCase() : 'inactive',

        thursday_day: 'Thursday',
        thursday_start_time: d.schedule && d.schedule.length > 3 && d.schedule[3].start_time ? d.schedule[3].start_time : '09:00',
        thursday_end_time: d.schedule && d.schedule.length > 3 && d.schedule[3].end_time ? d.schedule[3].end_time : '17:00',
        thursday_status: d.schedule && d.schedule.length > 3 && d.schedule[3].status ? d.schedule[3].status.toLowerCase() : 'inactive',

        friday_day: 'Friday',
        friday_start_time: d.schedule && d.schedule.length > 4 && d.schedule[4].start_time ? d.schedule[4].start_time : '09:00',
        friday_end_time: d.schedule && d.schedule.length > 4 && d.schedule[4].end_time ? d.schedule[4].end_time : '20:00',
        friday_status: d.schedule && d.schedule.length > 4 && d.schedule[4].status ? d.schedule[4].status.toLowerCase() : 'inactive',

        saturday_day: 'Saturday',
        saturday_start_time: d.schedule && d.schedule.length > 5 && d.schedule[5].start_time ? d.schedule[5].start_time : '09:00',
        saturday_end_time: d.schedule && d.schedule.length > 5 && d.schedule[5].end_time ? d.schedule[5].end_time : '18:00',
        saturday_status: d.schedule && d.schedule.length > 5 && d.schedule[5].status ? d.schedule[5].status.toLowerCase() : 'inactive',

        sunday_day: 'Sunday',
        sunday_start_time: d.schedule && d.schedule.length > 6 && d.schedule[6].start_time ? d.schedule[6].start_time : '09:00',
        sunday_end_time: d.schedule && d.schedule.length > 6 && d.schedule[6].end_time ? d.schedule[6].end_time : '16:00',
        sunday_status: d.schedule && d.schedule.length > 6 && d.schedule[6].status ? d.schedule[6].status.toLowerCase() : 'inactive'
      },

      // Now, posting this `schedule` to your model.
      // If `d.timings` is empty, this code will not iterate over it, and the default times/statuses will be applied.

      rating: d.rating || Math.floor(Math.random() * 6),
      status: (d?.status || '').toLowerCase(),
      branch_id: '',
      tax: '',
      currency: '',
      dial_code: '',
      home_page_title: d.meta?.home_page_title || ''
    };

    // Set home_page_title from meta array if present
    if (Array.isArray(d.meta)) {
      const homePageTitleMeta = d.meta.find((m: any) => m.key === 'home_page_title');
      this.model.home_page_title = homePageTitleMeta ? homePageTitleMeta.value : '';
    } else if (d.meta?.home_page_title) {
      // fallback for object structure
      this.model.home_page_title = d.meta.home_page_title;
    } else {
      this.model.home_page_title = '';
    }
  }

  // Split Formly fields for each section
  generalFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
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
          className: 'col-md-6 col-12'
        },
        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: 'Enter address',
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'Enter phone number',
            required: true
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
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'copyright_text',
          type: 'textarea',
          props: {
            label: 'Copyright text',
            placeholder: 'Enter copy right text',
            required: false
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'logo',
          type: 'input',
          props: {
            label: 'Restaurant Logo',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'logoBase64'),
            required: false
          },
          className: 'formly-image-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'favicon',
          type: 'input',
          props: {
            label: 'Favicon',
            placeholder: 'Enter favicon URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'faviconBase64'),
            required: false
          },
          className: 'formly-image-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'website',
          type: 'input',
          props: {
            label: 'Website',
            placeholder: 'Enter website URL',
            pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'home_page_title',
          type: 'input',
          props: {
            label: 'Home Page Title',
            placeholder: 'Enter home page title for SEO',
            required: false
          },
          className: 'col-md-6 col-12'
        }
      ]
    }
  ];

  timingFields: FormlyFieldConfig[] = [
    {
      key: 'schedule',
      fieldGroupClassName: 'row',
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
                required: true
              },
              className: 'col-md-3 col-12'
            },
            {
              key: `${day.toLowerCase()}_start_time`,
              type: 'input',
              props: {
                label: 'Start Time',
                type: 'time',
                required: true
              },
              className: 'col-md-3 col-12'
            },
            {
              key: `${day.toLowerCase()}_end_time`,
              type: 'input',
              props: {
                label: 'End Time',
                type: 'time',
                required: true
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
                required: true
              },
              className: 'formly-select-wrapper-3232 col-md-3 col-12'
            }
          ]
        }))
      ]
    }
  ];

  orderFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'currency',
          type: 'select',
          props: {
            label: 'Currency',
            placeholder: 'Select currency',
            required: true,
            options: []
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'dial_code',
          type: 'input',
          props: {
            label: 'Dial Code',
            placeholder: 'Enter dial code (e.g. +1)',
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'tax',
          type: 'input',
          props: {
            label: 'Tax (%)',
            placeholder: 'Enter tax percentage',
            type: 'number',
            min: 0,
            max: 100,
            required: true
          },
          className: 'col-md-6 col-12'
        }
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
        this.model['src_img'] = base64String; // Update the model

        // this.fields[0].fieldGroup[6].props['value'] = base64String; // Update the field value
        // this.fields[0].fieldGroup[6].formControl.setValue(base64String); // Update the form control value

        // field.formControl.setValue(base64String); // Update the form control value
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }
  updateScheduleFromApi(apiData) {
    // Update the schedule field directly in the model
    apiData.timings.forEach((timing) => {
      const dayKey = timing.day.toLowerCase(); // "monday", "tuesday", etc.
      this.model.schedule[`${dayKey}_start_time`] = timing.start_time;
      this.model.schedule[`${dayKey}_end_time`] = timing.end_time;
      this.model.schedule[`${dayKey}_status`] = timing.status;
    });
  }

  async submitGeneral() {
    // Validate general fields
    const generalFields = ['name', 'address', 'phone', 'email', 'copyright_text', 'website'];
    const missingFields = [];

    for (const field of generalFields) {
      const value = this.model[field];
      if (!value || value.trim() === '') {
        missingFields.push(field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
      }
    }

    if (missingFields.length > 0) {
      this.utility.presentFailureToast(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.model.email)) {
      this.utility.presentFailureToast('Please enter a valid email address');
      return;
    }

    // Validate website format
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (this.model.website && !websiteRegex.test(this.model.website)) {
      this.utility.presentFailureToast('Please enter a valid website URL');
      return;
    }

    // Submit general info
    await this.submitRestaurantData();
  }

  async submitTiming() {
    // Validate timing fields
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const missingFields = [];

    for (const day of days) {
      const startTime = this.model.schedule[`${day}_start_time`];
      const endTime = this.model.schedule[`${day}_end_time`];
      const status = this.model.schedule[`${day}_status`];

      if (!startTime || !endTime || !status) {
        missingFields.push(day.charAt(0).toUpperCase() + day.slice(1));
      }
    }

    if (missingFields.length > 0) {
      this.utility.presentFailureToast(`Please fill in timing for the following days: ${missingFields.join(', ')}`);
      return;
    }

    // Validate time format and logic
    for (const day of days) {
      const startTime = this.model.schedule[`${day}_start_time`];
      const endTime = this.model.schedule[`${day}_end_time`];

      if (startTime >= endTime) {
        this.utility.presentFailureToast(`${day.charAt(0).toUpperCase() + day.slice(1)}: End time must be after start time`);
        return;
      }
    }

    // Submit timing data
    await this.submitRestaurantData();
  }

  async submitOrder() {
    // Validate order fields
    const orderFields = ['currency', 'dial_code', 'tax'];
    const missingFields = [];

    for (const field of orderFields) {
      const value = this.model[field];
      if (!value || value.toString().trim() === '') {
        missingFields.push(field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
      }
    }

    if (missingFields.length > 0) {
      this.utility.presentFailureToast(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate tax percentage
    const tax = parseFloat(this.model.tax);
    if (isNaN(tax) || tax < 0 || tax > 100) {
      this.utility.presentFailureToast('Tax percentage must be between 0 and 100');
      return;
    }

    // Submit order/branch config data
    try {
      let d = {
        currency: this.model.currency,
        dial_code: this.model.dial_code,
        tax: this.model.tax,
        branch_id: this.data.id
      };

      const res = await this.network.updateBranchConfig(d, this.id);
      console.log('Response from updateBranchConfig:', res);

      if (res && res.data) {
        this.utility.presentSuccessToast('Branch configuration updated successfully.');
        this.nav.pop();
      } else {
        this.utility.presentFailureToast('Failed to update branch configuration.');
      }
    } catch (error) {
      console.error('Error updating branch config:', error);
      this.utility.presentFailureToast('An error occurred while updating branch configuration.');
    }

    setTimeout(() => {
      this.globaldata.getDefaultRestaurant();
    }, 700);
  }

  async submitRestaurantData() {
    console.log('Submitting restaurant data:', this.model);

    let d: any = {};

    // Copy all model properties except schedule
    Object.keys(this.model).forEach((key) => {
      if (key !== 'schedule') {
        d[key] = this.model[key];
      }
    });

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

    // Add meta data to the request
    if (this.model.home_page_title) {
      d['meta'] = [
        {
          key: 'home_page_title',
          value: this.model.home_page_title
        }
      ];
    }

    console.log(d);

    const res = await this.network.updateRestaurant(d, this.id);
    console.log(res);

    if (res) {
      this.utility.presentSuccessToast('Restaurant information updated successfully!');
      let item = res;
      this.grService.setRestaurant(item.id, item.name);

      // Call API to set default restaurant
      const data = {
        is_active: 1
      };

      await this.network.setActiveRestaurant(data, item.id);
      this.nav.pop();
    }
  }

  async getCurrencies(): Promise<any[]> {
    const res = await this.network.getCurrencies();
    if (res && res['data']) {
      return res['data'].map((c) => ({
        value: c.currency_code,
        label: `${c.flag} ${c.currency_code} - ${c.currency_name}`,
        dial_code: c.dial_code
      }));
    }
    return [];
  }

  async setCurrenciesInForm() {
    const options = await this.getCurrencies();
    this.allCurrencies = options; // Store for dial code lookup
    for (let i = 0; i < this.orderFields.length; i++) {
      for (let j = 0; j < this.orderFields[i].fieldGroup.length; j++) {
        let fl = this.orderFields[i].fieldGroup[j];
        if (fl.key === 'currency') {
          fl.props.options = options;
        }
      }
    }
  }

  async loadBranchConfig() {
    try {
      const res = await this.network.getBranchConfig(this.id);
      this.data = JSON.parse(localStorage.getItem('restaurant'));

      if (res && res.data && res.data.branch_config) {
        // Patch only the editable fields from branch_config
        const branchConfigModel = {
          tax: res.data.branch_config.tax,
          currency: res.data.branch_config.currency,
          dial_code: res?.data.restaurant.dial_code // Set this if you have it in the response, otherwise leave blank or fetch by currency
        };

        // Update the model with branch config data
        this.model['tax'] = branchConfigModel.tax;
        this.model['currency'] = branchConfigModel.currency;
        this.model['dial_code'] = branchConfigModel.dial_code;
        this.form.patchValue(branchConfigModel);
      } else {
        // Fallback in case of a failed response
        if (this.data && this.data.name) {
          this.model['branch_id'] = this.data.name;
        }
      }
    } catch (error) {
      console.error('Error loading branch config:', error);
      // Fallback in case of an error
      const data = JSON.parse(localStorage.getItem('restaurant'));
      if (data && data.name) {
        this.model['branch_id'] = data.name;
      }
    }
  }
}
