import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit {

  id;

  constructor(private route: ActivatedRoute,private network: NetworkService){

  }

  ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
 this.initialize();



  }

   async initialize(){
    // Fetch the data from the server
    const res = await this.network.getCategoriesById(this.id);
    console.log(res);
      this.model=res.category;
  }

  form = new FormGroup({});
  model = {
    name: '',
    restaurant: '',
    category: '',
    status: '',
    description: '',
    image: null
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Category Name',
            placeholder: 'Enter category name',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'restaurant',
          type: 'select',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Enter Restaurant  name',
            options: [],
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
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
          key: 'category',
          type: 'select',
          props: {
            label: 'Category',
            placeholder: 'Select a parent category',
            options: []
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Image',
            placeholder: 'Enter image ',
            type: 'file'
          },
          className: 'col-md-4 col-12'
        },
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
    }
  ];
  async onSubmit(model) {
  }

}
