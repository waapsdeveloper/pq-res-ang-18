import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-variations',
  templateUrl: './edit-variations.component.html',
  styleUrl: './edit-variations.component.scss'
})
export class EditVariationsComponent implements OnInit{
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
        if (fl && fl.key === 'restaurant_id') {
          fl.props = fl.props || {}; // Ensure props exists
          fl.props.options = res;}
      }
    }
  }




  async initialize() {
    // Fetch the data from the server
    const res = await this.network.getVariationsById(this.id);
    console.log(res);
    this.model = res.Rtable;
  }
  form = new FormGroup({});
  model = {
    restaurant_id: '',
    meta_value:'',
    description: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'restaurant_id',
          type: 'select',
          props: {
            label: 'Restaurant',
            placeholder: 'Select a restaurant',
            required: false,
            options: []
          },
          className: 'col-md-4 col-12'
        },


        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter a description',
            required: false
          },
          className: 'col-md-6 col-12' // Full width for description
        },

      ]
    }
  ];
  async ngAfterViewInit() {
    const res = await this.network.getVariationsById(this.id);
    let d = Object.assign({}, res.variation);
    console.log(d);
   // Dynamic model assignment
 this.model = {
  restaurant_id: d.restaurant_id  || '', // Matches `model`
 description: d.description || '',
 meta_value:d.meta_value    // Matches `model`
};


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
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
