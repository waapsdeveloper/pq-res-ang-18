import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
      monday_day_type: 'week_days',
      monday_start_time: '09:00',
      monday_end_time: '17:00',
      monday_status: 'active',
      monday_24h: false,
      monday_open: true,
      monday_off_day: false,
      monday_break_times: [],

      tuesday_day: 'Tuesday',
      tuesday_day_type: 'week_days',
      tuesday_start_time: '09:00',
      tuesday_end_time: '17:00',
      tuesday_status: 'active',
      tuesday_24h: false,
      tuesday_open: true,
      tuesday_off_day: false,
      tuesday_break_times: [],

      wednesday_day: 'Wednesday',
      wednesday_day_type: 'week_days',
      wednesday_start_time: '09:00',
      wednesday_end_time: '17:00',
      wednesday_status: 'active',
      wednesday_24h: false,
      wednesday_open: true,
      wednesday_off_day: false,
      wednesday_break_times: [],

      thursday_day: 'Thursday',
      thursday_day_type: 'week_days',
      thursday_start_time: '09:00',
      thursday_end_time: '17:00',
      thursday_status: 'active',
      thursday_24h: false,
      thursday_open: true,
      thursday_off_day: false,
      thursday_break_times: [],

      friday_day: 'Friday',
      friday_day_type: 'week_days',
      friday_start_time: '10:00',
      friday_end_time: '20:00',
      friday_status: 'active',
      friday_24h: false,
      friday_open: true,
      friday_off_day: false,
      friday_break_times: [],

      saturday_day: 'Saturday',
      saturday_day_type: 'Weekends',
      saturday_start_time: '10:00',
      saturday_end_time: '18:00',
      saturday_status: 'inactive',
      saturday_24h: false,
      saturday_open: false,
      saturday_off_day: true,
      saturday_break_times: [],

      sunday_day: 'Sunday',
      sunday_day_type: 'Weekends',
      sunday_start_time: '10:00',
      sunday_end_time: '16:00',
      sunday_status: 'inactive',
      sunday_24h: false,
      sunday_open: false,
      sunday_off_day: true,
      sunday_break_times: []
    },
    description: '',
    rating: Math.floor(Math.random() * 6),
    status: 'active',
    // Branch config properties
    branch_id: '',
    tax: '',
    currency: '',
    dial_code: '',
    tips: '',
    delivery_charges: '',
    // Meta data properties
    home_page_title: ''
  };

  // Store timings as JSON array for easy manipulation
  timingsJson: Array<{
    day: string;
    day_type: string;
    start_time: string;
    end_time: string;
    status: string;
    is_24h: boolean;
    is_open: boolean;
    is_off_day: boolean;
    break_times: Array<{ start: string; end: string }>;
  }> = [];

  // Branch config properties for orders tab
  allCurrencies: any;
  data: any;

  // Sidebar navigation
  activeSection: 'general' | 'timing' | 'order' = 'general';

  // Global timing controls
  globalStartTime: string = '09:00';
  globalEndTime: string = '17:00';
  globalDayType: string = 'week_days';
  globalBreakStart: string = '12:00';
  globalBreakEnd: string = '13:00';
  globalBreakTimes: Array<{ start: string; end: string }> = [];
  global24h: boolean = false;
  globalOffDay: boolean = false;

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
    
    // Initialize form with all required controls
    this.initializeForm();
    
    this.initialize();

    // Initialize branch config functionality for orders tab
    await this.setCurrenciesInForm();
    await this.loadBranchConfig();

    // Populate timing fields from JSON data
    this.populateTimingFieldsFromJson();

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
      
      // Sync schedule changes to timingsJson
      if (value && value['schedule']) {
        this.syncScheduleToTimingsJson();
      }
    });
  }

  // Initialize form with all required controls
  initializeForm() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    // Create the form with all controls (flat structure)
    const formControls = {
      name: new FormControl(this.model.name || ''),
      address: new FormControl(this.model.address || ''),
      phone: new FormControl(this.model.phone || ''),
      email: new FormControl(this.model.email || ''),
      website: new FormControl(this.model.website || ''),
      copyright_text: new FormControl(this.model.copyright_text || ''),
      logo: new FormControl(this.model.logo || ''),
      home_page_title: new FormControl(this.model.home_page_title || ''),
      description: new FormControl(this.model.description || ''),
      status: new FormControl(this.model.status || 'active'),
      currency: new FormControl(this.model.currency || ''),
      dial_code: new FormControl(this.model.dial_code || ''),
      tax: new FormControl(this.model.tax || ''),
      tips: new FormControl(this.model.tips || ''),
      delivery_charges: new FormControl(this.model.delivery_charges || '')
    };
    
    // Add schedule controls directly to the form (not nested)
    days.forEach(day => {
      formControls[`${day}_day`] = new FormControl(this.model.schedule[`${day}_day`] || day.charAt(0).toUpperCase() + day.slice(1));
      formControls[`${day}_start_time`] = new FormControl(this.model.schedule[`${day}_start_time`] || '09:00');
      formControls[`${day}_end_time`] = new FormControl(this.model.schedule[`${day}_end_time`] || '17:00');
      formControls[`${day}_status`] = new FormControl(this.model.schedule[`${day}_status`] || 'active');
    });
    
    this.form = new FormGroup(formControls);
  }

  async initialize() {
    // Load restaurant data from API
    try {
      const response = await this.network.getRestaurantById(this.id);
      if (response && response.data) {
        const restaurantData = response.data;

        // Update model with API data
        this.model.name = restaurantData.name || '';
        this.model.address = restaurantData.address || '';
        this.model.phone = restaurantData.phone || '';
        this.model.email = restaurantData.email || '';
        this.model.website = restaurantData.website || '';
        this.model.description = restaurantData.description || '';
        this.model.status = restaurantData.status || 'active';
        this.model.src_img = restaurantData.image || '';
        this.model.logo = restaurantData.logo || '';
        this.model.copyright_text = restaurantData.copyright_text || '';
        this.model.home_page_title = restaurantData.home_page_title || '';

        // --- Load timings from meta if present ---
        let timingsLoaded = false;
        if (restaurantData.meta) {
          let timingsMeta = null;
          if (Array.isArray(restaurantData.meta)) {
            timingsMeta = restaurantData.meta.find((m: any) => m.key === 'branch_timings');
          } else if (restaurantData.meta.branch_timings) {
            timingsMeta = { value: restaurantData.meta.branch_timings };
          }
          if (timingsMeta && timingsMeta.value) {
            try {
              const timings = JSON.parse(timingsMeta.value);
              this.updateScheduleFromApi(timings);
              timingsLoaded = true;
            } catch (e) {
              console.error('Failed to parse timings from meta:', e);
            }
          }
        }
        // --- Fallback: Load schedule data if available and not loaded from meta ---
        if (!timingsLoaded && restaurantData.schedule && Array.isArray(restaurantData.schedule)) {
          this.updateScheduleFromApi(restaurantData.schedule);
        }
      }
    } catch (error) {
      console.error('Error loading restaurant data:', error);
    }
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
        monday_day_type: 'week_days',
        monday_start_time: d.schedule && d.schedule.length > 0 && d.schedule[0].start_time ? d.schedule[0].start_time : '09:00',
        monday_end_time: d.schedule && d.schedule.length > 0 && d.schedule[0].end_time ? d.schedule[0].end_time : '17:00',
        monday_status: d.schedule && d.schedule.length > 0 && d.schedule[0].status ? d.schedule[0].status.toLowerCase() : 'inactive',
        monday_24h: false,
        monday_open: true,
        monday_off_day: false,
        monday_break_times: [],

        tuesday_day: 'Tuesday',
        tuesday_day_type: 'week_days',
        tuesday_start_time: d.schedule && d.schedule.length > 1 && d.schedule[1].start_time ? d.schedule[1].start_time : '09:00',
        tuesday_end_time: d.schedule && d.schedule.length > 1 && d.schedule[1].end_time ? d.schedule[1].end_time : '17:00',
        tuesday_status: d.schedule && d.schedule.length > 1 && d.schedule[1].status ? d.schedule[1].status.toLowerCase() : 'inactive',
        tuesday_24h: false,
        tuesday_open: true,
        tuesday_off_day: false,
        tuesday_break_times: [],

        wednesday_day: 'Wednesday',
        wednesday_day_type: 'week_days',
        wednesday_start_time: d.schedule && d.schedule.length > 2 && d.schedule[2].start_time ? d.schedule[2].start_time : '09:00',
        wednesday_end_time: d.schedule && d.schedule.length > 2 && d.schedule[2].end_time ? d.schedule[2].end_time : '17:00',
        wednesday_status: d.schedule && d.schedule.length > 2 && d.schedule[2].status ? d.schedule[2].status.toLowerCase() : 'inactive',
        wednesday_24h: false,
        wednesday_open: true,
        wednesday_off_day: false,
        wednesday_break_times: [],

        thursday_day: 'Thursday',
        thursday_day_type: 'week_days',
        thursday_start_time: d.schedule && d.schedule.length > 3 && d.schedule[3].start_time ? d.schedule[3].start_time : '09:00',
        thursday_end_time: d.schedule && d.schedule.length > 3 && d.schedule[3].end_time ? d.schedule[3].end_time : '17:00',
        thursday_status: d.schedule && d.schedule.length > 3 && d.schedule[3].status ? d.schedule[3].status.toLowerCase() : 'inactive',
        thursday_24h: false,
        thursday_open: true,
        thursday_off_day: false,
        thursday_break_times: [],

        friday_day: 'Friday',
        friday_day_type: 'week_days',
        friday_start_time: d.schedule && d.schedule.length > 4 && d.schedule[4].start_time ? d.schedule[4].start_time : '09:00',
        friday_end_time: d.schedule && d.schedule.length > 4 && d.schedule[4].end_time ? d.schedule[4].end_time : '20:00',
        friday_status: d.schedule && d.schedule.length > 4 && d.schedule[4].status ? d.schedule[4].status.toLowerCase() : 'inactive',
        friday_24h: false,
        friday_open: true,
        friday_off_day: false,
        friday_break_times: [],

        saturday_day: 'Saturday',
        saturday_day_type: 'weekend',
        saturday_start_time: d.schedule && d.schedule.length > 5 && d.schedule[5].start_time ? d.schedule[5].start_time : '09:00',
        saturday_end_time: d.schedule && d.schedule.length > 5 && d.schedule[5].end_time ? d.schedule[5].end_time : '18:00',
        saturday_status: d.schedule && d.schedule.length > 5 && d.schedule[5].status ? d.schedule[5].status.toLowerCase() : 'inactive',
        saturday_24h: false,
        saturday_open: false,
        saturday_off_day: true,
        saturday_break_times: [],

        sunday_day: 'Sunday',
        sunday_day_type: 'weekend',
        sunday_start_time: d.schedule && d.schedule.length > 6 && d.schedule[6].start_time ? d.schedule[6].start_time : '09:00',
        sunday_end_time: d.schedule && d.schedule.length > 6 && d.schedule[6].end_time ? d.schedule[6].end_time : '16:00',
        sunday_status: d.schedule && d.schedule.length > 6 && d.schedule[6].status ? d.schedule[6].status.toLowerCase() : 'inactive',
        sunday_24h: false,
        sunday_open: false,
        sunday_off_day: true,
        sunday_break_times: []
      },

      // Now, posting this `schedule` to your model.
      // If `d.timings` is empty, this code will not iterate over it, and the default times/statuses will be applied.

      rating: d.rating || Math.floor(Math.random() * 6),
      status: (d?.status || '').toLowerCase(),
      branch_id: '',
      tax: '',
      currency: '',
      dial_code: '',
      tips: '',
      delivery_charges: '',
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

    // Initialize timingsJson array from schedule
    this.syncScheduleToTimingsJson();
  }

  // Sync schedule object to timingsJson array
  syncScheduleToTimingsJson() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    this.timingsJson = days.map((day) => ({
      day: this.model.schedule[`${day}_day`],
      day_type: this.model.schedule[`${day}_day_type`],
      start_time: this.model.schedule[`${day}_start_time`],
      end_time: this.model.schedule[`${day}_end_time`],
      status: this.model.schedule[`${day}_status`],
      is_24h: this.model.schedule[`${day}_24h`],
      is_open: this.model.schedule[`${day}_open`],
      is_off_day: this.model.schedule[`${day}_off_day`],
      break_times: this.model.schedule[`${day}_break_times`] || []
    }));
  }

  // Sync timingsJson array back to schedule object
  syncTimingsJsonToSchedule() {
    this.timingsJson.forEach((timing) => {
      const day = timing.day.toLowerCase();
      this.model.schedule[`${day}_day`] = timing.day;
      this.model.schedule[`${day}_day_type`] = timing.day_type;
      this.model.schedule[`${day}_start_time`] = timing.start_time;
      this.model.schedule[`${day}_end_time`] = timing.end_time;
      this.model.schedule[`${day}_status`] = timing.status;
      this.model.schedule[`${day}_24h`] = timing.is_24h;
      this.model.schedule[`${day}_open`] = timing.is_open;
      this.model.schedule[`${day}_off_day`] = timing.is_off_day;
      this.model.schedule[`${day}_break_times`] = timing.break_times;
    });
  }

  // Get timings as JSON string
  getTimingsAsJson(): string {
    return JSON.stringify(this.timingsJson, null, 2);
  }

  // View JSON data for debugging
  viewJsonData() {
    const jsonData = this.getTimingsAsJson();
    console.log('Timings JSON Data:', jsonData);
    console.log('Timings Array:', this.timingsJson);
    this.utility.presentSuccessToast('JSON data logged to console. Check browser console for details.');
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
            required: false,
            maxLength: 60
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
              className: 'col-md-2 col-12'
            },
            {
              key: `${day.toLowerCase()}_start_time`,
              type: 'input',
              props: {
                label: 'Start Time',
                type: 'time',
                required: true
              },
              className: 'col-md-2 col-12'
            },
            {
              key: `${day.toLowerCase()}_end_time`,
              type: 'input',
              props: {
                label: 'End Time',
                type: 'time',
                required: true
              },
              className: 'col-md-2 col-12'
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
              className: 'formly-select-wrapper-3232 col-md-2 col-12'
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
        },
        {
          key: 'tips',
          type: 'input',
          props: {
            label: 'Tips (%)',
            placeholder: 'Enter tips percentage',
            type: 'number',
            min: 0,
            max: 100,
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'delivery_charges',
          type: 'input',
          props: {
            label: 'Delivery Charges',
            placeholder: 'Enter delivery charges',
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
    // Handle both old format (timings array) and new format (schedule array)
    if (Array.isArray(apiData)) {
      // New format: direct array of schedule objects
      apiData.forEach((timing) => {
        const dayKey = timing.day.toLowerCase();

        // Update model schedule
        this.model.schedule[`${dayKey}_day`] = timing.day;
        this.model.schedule[`${dayKey}_start_time`] = timing.start_time || '09:00';
        this.model.schedule[`${dayKey}_end_time`] = timing.end_time || '17:00';
        this.model.schedule[`${dayKey}_day_type`] = timing.day_type || 'week_days';
        this.model.schedule[`${dayKey}_status`] = timing.status || 'active';
        this.model.schedule[`${dayKey}_24h`] = timing.is_24h || false;
        this.model.schedule[`${dayKey}_open`] = timing.is_open !== undefined ? timing.is_open : true;
        this.model.schedule[`${dayKey}_break_times`] = timing.break_times || [];

        // Update form controls
        const startControl = this.form.get(`${dayKey}_start_time`);
        const endControl = this.form.get(`${dayKey}_end_time`);
        const statusControl = this.form.get(`${dayKey}_status`);
        
        if (startControl) startControl.setValue(timing.start_time || '09:00');
        if (endControl) endControl.setValue(timing.end_time || '17:00');
        if (statusControl) statusControl.setValue(timing.status || 'active');
      });

      // Update global controls based on first day
      if (apiData.length > 0) {
        const firstDay = apiData[0];
        this.globalStartTime = firstDay.start_time || '09:00';
        this.globalEndTime = firstDay.end_time || '17:00';
        this.globalDayType = firstDay.day_type || 'week_days';
        this.globalBreakTimes = [...(firstDay.break_times || [])];
      }
    } else if (apiData.timings && Array.isArray(apiData.timings)) {
      // Old format: timings array inside object
      apiData.timings.forEach((timing) => {
        const dayKey = timing.day.toLowerCase();
        this.model.schedule[`${dayKey}_start_time`] = timing.start_time;
        this.model.schedule[`${dayKey}_end_time`] = timing.end_time;
        this.model.schedule[`${dayKey}_status`] = timing.status;
      });
    }

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
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
    // Sync form values to model before validation
    this.syncScheduleToTimingsJson();

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

    // Log the timings JSON for debugging
    console.log('Timings JSON:', this.timingsJson);

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
        branch_id: this.data.id,
        tips: this.model.tips,
        delivery_charges: this.model.delivery_charges
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
    console.log('Timings JSON:', this.timingsJson);

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

    // Use timingsJson array instead of schedule object
    d['schedule'] = this.timingsJson;

    // Add meta data to the request
    d['meta'] = [];
    if (this.model.home_page_title) {
      d['meta'].push({
        key: 'home_page_title',
        value: this.model.home_page_title
      });
    }
    // --- Always save timingsJson as JSON string in meta ---
    d['meta'].push({
      key: 'branch_timings',
      value: JSON.stringify(this.timingsJson)
    });

    console.log('Final data to submit:', d);

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
      console.log('Branch config response:', res);

      if (res && res.data) {
        this.data = res.data;
        this.model.currency = res.data.currency || '';
        this.model.dial_code = res.data.dial_code || '';
        this.model.tax = res.data.tax || '';
        this.model.tips = res.data.tips || '';
        this.model.delivery_charges = res.data.delivery_charges || '';
      }
    } catch (error) {
      console.error('Error loading branch config:', error);
    }
  }

  // Global timing control methods
  set24Hours() {
    this.globalStartTime = '00:00';
    this.globalEndTime = '23:59';

    // Automatically apply 24h settings to all days
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    days.forEach((day) => {
      this.model.schedule[`${day}_start_time`] = '00:00';
      this.model.schedule[`${day}_end_time`] = '23:59';
      this.model.schedule[`${day}_24h`] = true;
      this.model.schedule[`${day}_open`] = true;
    });

    // Update form controls
    days.forEach((day) => {
      const startControl = this.form.get(`${day}_start_time`);
      const endControl = this.form.get(`${day}_end_time`);
      
      if (startControl) startControl.setValue('00:00');
      if (endControl) endControl.setValue('23:59');
    });

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();

    this.utility.presentSuccessToast('24h settings applied to all days!');
  }

  // Force refresh break times display
  refreshBreakTimesDisplay() {
    // Force change detection by creating new array references
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
      if (this.model.schedule[`${day}_break_times`]) {
        this.model.schedule[`${day}_break_times`] = [...this.model.schedule[`${day}_break_times`]];
      }
    });
  }

  applyToAllDays() {
    // Determine which days to apply settings to based on global day type
    let targetDays: string[] = [];
    
    if (this.globalDayType === 'week_days') {
      targetDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    } else if (this.globalDayType === 'weekends') {
      targetDays = ['saturday', 'sunday'];
    }
    
    console.log('Applying to days:', targetDays);
    console.log('Global break times:', this.globalBreakTimes);
    
    targetDays.forEach((day) => {
      // Apply basic timing settings
      this.model.schedule[`${day}_start_time`] = this.globalStartTime;
      this.model.schedule[`${day}_end_time`] = this.globalEndTime;
      this.model.schedule[`${day}_day_type`] = this.globalDayType;
      
      // Apply break times from global settings - create a deep copy to avoid reference issues
      this.model.schedule[`${day}_break_times`] = this.globalBreakTimes.map(breakTime => ({
        start: breakTime.start,
        end: breakTime.end
      }));
      
      console.log(`Applied break times to ${day}:`, this.model.schedule[`${day}_break_times`]);
      
      // Apply 24h and open settings based on global controls
      // If global time is 24h, set 24h to true for all days
      if (this.global24h) {
        this.model.schedule[`${day}_24h`] = true;
        this.model.schedule[`${day}_open`] = true;
        this.model.schedule[`${day}_off_day`] = false;
      } else if (this.globalOffDay) {
        this.model.schedule[`${day}_24h`] = false;
        this.model.schedule[`${day}_open`] = false;
        this.model.schedule[`${day}_off_day`] = true;
      } else {
        this.model.schedule[`${day}_24h`] = false;
        this.model.schedule[`${day}_open`] = true;
        this.model.schedule[`${day}_off_day`] = false;
      }
    });

    // Update form controls with actual values
    targetDays.forEach((day) => {
      const startControl = this.form.get(`${day}_start_time`);
      const endControl = this.form.get(`${day}_end_time`);
      const dayTypeControl = this.form.get(`${day}_day_type`);
      const statusControl = this.form.get(`${day}_status`);
      
      if (startControl) startControl.setValue(this.globalStartTime);
      if (endControl) endControl.setValue(this.globalEndTime);
      if (dayTypeControl) dayTypeControl.setValue(this.globalDayType);
      if (statusControl) statusControl.setValue('active'); // Set all to active by default
    });
    console.log('Global settings applied to:', this.model.schedule);

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();

    // Force refresh break times display
    this.refreshBreakTimesDisplay();

    const dayTypeText = this.globalDayType === 'week_days' ? 'Week Days (Monday-Friday)' : 'Weekends (Saturday-Sunday)';
    this.utility.presentSuccessToast(`Settings applied to ${dayTypeText} successfully!`);
  }

  // Break time management methods
  addGlobalBreak() {
    if (this.globalBreakStart && this.globalBreakEnd) {
      this.globalBreakTimes.push({
        start: this.globalBreakStart,
        end: this.globalBreakEnd
      });
      
      // Reset the input fields
      this.globalBreakStart = '12:00';
      this.globalBreakEnd = '13:00';
      
      // Force change detection to update the UI
      this.syncScheduleToTimingsJson();
    }
  }

  removeGlobalBreak(index: number) {
    this.globalBreakTimes.splice(index, 1);
    // Force change detection to update the UI
    this.syncScheduleToTimingsJson();
  }

  toggle24h(day: string) {
    this.model.schedule[`${day}_24h`] = !this.model.schedule[`${day}_24h`];
    if (this.model.schedule[`${day}_24h`]) {
      this.model.schedule[`${day}_start_time`] = '00:00';
      this.model.schedule[`${day}_end_time`] = '23:59';
    }

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
  }

  toggleOpen(day: string) {
    this.model.schedule[`${day}_open`] = !this.model.schedule[`${day}_open`];

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
  }

  toggleOffDay(day: string) {
    this.model.schedule[`${day}_off_day`] = !this.model.schedule[`${day}_off_day`];
    
    // If off day is enabled, disable open and 24h
    if (this.model.schedule[`${day}_off_day`]) {
      this.model.schedule[`${day}_open`] = false;
      this.model.schedule[`${day}_24h`] = false;
    }

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
  }

  toggleGlobal24h() {
    this.global24h = !this.global24h;
    
    if (this.global24h) {
      this.globalStartTime = '00:00';
      this.globalEndTime = '23:59';
    }
  }

  toggleGlobalOffDay() {
    this.globalOffDay = !this.globalOffDay;
  }

  getBreakTimes(day: string): Array<{ start: string; end: string }> {
    return this.model.schedule[`${day}_break_times`] || [];
  }

  addBreakTime(day: string) {
    if (!this.model.schedule[`${day}_break_times`]) {
      this.model.schedule[`${day}_break_times`] = [];
    }
    this.model.schedule[`${day}_break_times`].push({
      start: '12:00',
      end: '13:00'
    });

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
  }

  removeBreakTime(day: string, index: number) {
    this.model.schedule[`${day}_break_times`].splice(index, 1);

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
  }

  updateBreakTime(day: string, index: number, breakTime: { start: string; end: string }) {
    this.model.schedule[`${day}_break_times`][index] = breakTime;

    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
  }

  // New method to populate timing fields from JSON data
  populateTimingFieldsFromJson() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    days.forEach((day) => {
      // Set start time
      const startTime = this.model.schedule[`${day}_start_time`] || '09:00';
      const startControl = this.form.get(`${day}_start_time`);
      if (startControl) {
        startControl.setValue(startTime);
      }
      
      // Set end time
      const endTime = this.model.schedule[`${day}_end_time`] || '17:00';
      const endControl = this.form.get(`${day}_end_time`);
      if (endControl) {
        endControl.setValue(endTime);
      }
      
      // Set 24h toggle
      const is24h = this.model.schedule[`${day}_24h`] || false;
      this.model.schedule[`${day}_24h`] = is24h;
      
      // Set open toggle
      const isOpen = this.model.schedule[`${day}_open`] || true;
      this.model.schedule[`${day}_open`] = isOpen;
      
      // Set off day toggle
      const isOffDay = this.model.schedule[`${day}_off_day`] || false;
      this.model.schedule[`${day}_off_day`] = isOffDay;
      
      // Set break times
      const breakTimes = this.model.schedule[`${day}_break_times`] || [];
      this.model.schedule[`${day}_break_times`] = [...breakTimes];
    });
    
    // Set global controls based on first day (monday) or default values
    this.globalStartTime = this.model.schedule.monday_start_time || '09:00';
    this.globalEndTime = this.model.schedule.monday_end_time || '17:00';
    this.globalDayType = this.model.schedule.monday_day_type || 'week_days';
    this.globalBreakTimes = [...(this.model.schedule.monday_break_times || [])];
    this.global24h = this.model.schedule.monday_24h || false;
    this.globalOffDay = this.model.schedule.monday_off_day || false;
    
    // Sync to timingsJson
    this.syncScheduleToTimingsJson();
  }
}