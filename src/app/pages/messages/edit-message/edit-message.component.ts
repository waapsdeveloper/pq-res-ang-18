import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrl: './edit-message.component.scss'
})
export class EditMessageComponent implements OnInit {
  id;

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private fb: FormBuilder,
    private nav: NavService,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    this.setRestaurantsInForm();
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();
  }
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
        if (fl && fl.key === 'restaurant_id') {
          fl.props = fl.props || {}; // Ensure props exists
          fl.props.options = res;
        }
      }
    }
  }

  async initialize() {
    // Fetch the data from the server
    const res = await this.network.getTablesById(this.id);
    console.log(res);
    this.model = res.Rtable;
  }
  form = new FormGroup({});
  model = {
    name: '',
    email: '',
    phone: ''
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
            placeholder: '',
            required: true
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email',
            placeholder: '',
            type: 'email',
            required: true
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'Enter phone ',
            type: 'tel',
            required: true
          },
          className: 'col-md-2 col-12'
        }
      ]
    }
  ];
  async ngAfterViewInit() {
    let obj = {
      email: localStorage.getItem('email'),

    }
    const res = await this.network.replyMessage(obj,this.id);
    let d = Object.assign({}, res.Rtable);
    console.log(d);
    // Dynamic model assignment
    // this.model = {
    //   no_of_seats: d.no_of_seats || '', // Matches `model`
    //   floor: d.floor || '', // Matches `model`
    //   // location: d.location || '',           // Matches `model`
    //   description: d.description || '', // Matches `model`
    //   status: d.status || '' // Matches `model`
    // };
  }

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      const res = await this.network.updateTable(d, this.id);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Table Updated!');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
