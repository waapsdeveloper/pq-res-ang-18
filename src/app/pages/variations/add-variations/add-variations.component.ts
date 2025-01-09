import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-variations',
  templateUrl: './add-variations.component.html',
  styleUrl: './add-variations.component.scss'
})
export class AddVariationsComponent {

  form = new FormGroup({});
  model = {
    name: '',
    meta_value:null,
    description: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Enter Variation Name',
            placeholder: 'Enter name',
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter a description',
            required: false
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'meta_value',
          type: 'repeat',
          props: {
            label: 'Options',
            addText: 'Add Option',
            removeText: 'Remove Option'
          },
          fieldArray: {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'options',
                type: 'input',
                props: {
                  label: 'Option Name',
                  placeholder: 'Thin Crust',
                  required: true
                },
                className: 'col-md-6 col-12'
              },
              {
                key: 'price_change',
                type: 'input',
                props: {
                  label: 'Price Change',
                  type: 'number',
                  placeholder: '50',
                  required: true
                },
                className: 'col-md-6 col-12'
              }
            ]
          },
          className: 'col-md-12 col-12'
        }
,
        {
          key: 'default',
          type: 'select',
          props: {
            label: 'Default Option',
            placeholder: 'Select the default option',
            options: [] // You can dynamically populate this based on options
          },
          className: 'col-md-3 col-12'
        }
      ]
    }
  ];




  constructor(private nav: NavService, private network: NetworkService, private utility: UtilityService) {

  }

  ngOnInit(): void {
  }

   async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;
      const res = await this.network.addVariations(d);
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

}
