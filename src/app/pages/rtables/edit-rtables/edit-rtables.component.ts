import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
@Component({
  selector: 'app-edit-rtables',
  templateUrl: './edit-rtables.component.html',
  styleUrl: './edit-rtables.component.scss'
})
export class EditRtablesComponent  implements OnInit{

  id;

  constructor(private route: ActivatedRoute, private network: NetworkService){

  }

  ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();




  }

async  initialize(){
    // Fetch the data from the server
    const res = await this.network.getTablesById(this.id);
    console.log(res);
    this.model = res.Rtable;
  }
  form = new FormGroup({});
  model = {
    restaurant_id: '',
    identifier: '',
    no_of_seats: '',
    floor: '',
    location: '',
    description: '',
    status: '',
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
            options: [],
          },
          className: 'col-md-4 col-12',
        },,{
          key: 'identifier',
          type: 'input',
          props: {
            label: 'Name',
            placeholder: 'Enter table name',
            required: true,
            minLength: 3,
          },
          className: 'col-md-3 col-12', // 6 columns on md+, full width on small screens
        },
        {
          key: 'no_of_seats',
          type: 'input',
          props: {
            label: 'Number of Seats',
            placeholder: 'Enter number of seats',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255, // Constraint for maximum value
          },
          className: 'col-md-3 col-12',
        },
        {
          key: 'floor',
          type: 'input',
          props: {
            label: 'Floor',
            placeholder: 'Enter floor description',
            required: true,
            maxLength: 500, // Constraint for maximum length
          },
          className: 'col-md-4 col-12',
        },

        {
          key: 'location',
          type: 'input',
          props: {
            label: 'Location',
            placeholder: 'Near west wall',
            required: true,
          },
          className: 'col-md-6 col-12',
        },


        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter a description',
            required: false,
          },
          className: 'col-md-6 col-12', // Full width for description
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


  onSubmit(m){}
}
